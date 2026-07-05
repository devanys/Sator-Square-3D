from pydantic import BaseModel
from typing import Optional, List


class GridCellError(BaseModel):
    row: int
    col: int
    expected: str


class PuzzleCheckRequest(BaseModel):
    grid: List[List[str]]


class PuzzleCheckResponse(BaseModel):
    is_valid: bool
    errors: List[GridCellError]
    message: str


class PatternAnalysis(BaseModel):
    symmetry_score: float
    entropy: float
    is_perfect_palindrome: bool
    pater_noster_found: bool
    letter_distribution: dict


class CompletionRequest(BaseModel):
    time_seconds: float
    hints_used: int = 0


class AttemptOut(BaseModel):
    id: int
    player_name: Optional[str] = None
    time_seconds: float
    hints_used: int
    is_completed: bool

    class Config:
        from_attributes = True


class SiteOut(BaseModel):
    id: int
    name: str
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True
