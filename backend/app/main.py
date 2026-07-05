from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import engine, Base, get_db
from .models import PuzzleAttempt, HistoricalSite
from .schemas import (
    PuzzleCheckRequest,
    PuzzleCheckResponse,
    PatternAnalysis,
    CompletionRequest,
    AttemptOut,
    SiteOut,
)
from .services.sator_logic import SatorAnalyzer
from .services.pattern_analyzer import PatternAnalyzer

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sator Square API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Sator Square API"}


@app.get("/api/square")
def get_square():
    return SatorAnalyzer.directions()


@app.post("/api/puzzle/validate", response_model=PuzzleCheckResponse)
def validate_puzzle(req: PuzzleCheckRequest):
    return SatorAnalyzer.validate(req.grid)


@app.post("/api/puzzle/analyze", response_model=PatternAnalysis)
def analyze(req: PuzzleCheckRequest):
    return PatternAnalyzer.analyze(req.grid)


@app.get("/api/puzzle/pool")
def get_pool():
    return {"pool": SatorAnalyzer.shuffled_pool()}


@app.post("/api/puzzle/complete", response_model=AttemptOut)
def save_completion(req: CompletionRequest, db: Session = Depends(get_db)):
    attempt = PuzzleAttempt(
        time_seconds=req.time_seconds,
        hints_used=req.hints_used,
        is_completed=True,
    )
    db.add(attempt)
    db.commit()
    db.refresh(attempt)
    return attempt


@app.get("/api/stats", response_model=list[AttemptOut])
def get_stats(db: Session = Depends(get_db)):
    return (
        db.query(PuzzleAttempt)
        .filter(PuzzleAttempt.is_completed == True)
        .order_by(PuzzleAttempt.time_seconds.asc())
        .limit(20)
        .all()
    )


@app.get("/api/sites", response_model=list[SiteOut])
def get_sites(db: Session = Depends(get_db)):
    sites = db.query(HistoricalSite).all()
    if not sites:
        seeds = [
            HistoricalSite(name="Pompeii", location="Italy", latitude=40.7484, longitude=14.4845,
                           description="Found on a wall in Pompeii, buried by Vesuvius in 79 AD. The oldest known Sator Square."),
            HistoricalSite(name="Dura-Europos", location="Syria", latitude=34.7478, longitude=40.7314,
                           description="Discovered in a Roman military garrison, 3rd century AD."),
            HistoricalSite(name="Cirencester", location="England", latitude=51.7164, longitude=-1.9417,
                           description="Found in the Romano-British town of Corinium."),
            HistoricalSite(name="Cihampelas", location="West Java, Indonesia", latitude=-6.8885, longitude=107.6101,
                           description="A unique local version carved into stone."),
            HistoricalSite(name="Austria", location="Austria", latitude=48.2082, longitude=16.3738,
                           description="Several medieval examples found in Austrian churches."),
        ]
        db.add_all(seeds)
        db.commit()
        return seeds
    return sites
