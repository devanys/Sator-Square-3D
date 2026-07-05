from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.sql import func
from .database import Base


class PuzzleAttempt(Base):
    __tablename__ = "puzzle_attempts"

    id = Column(Integer, primary_key=True, index=True)
    player_name = Column(String(50), nullable=True)
    time_seconds = Column(Float, nullable=False)
    hints_used = Column(Integer, default=0)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class HistoricalSite(Base):
    __tablename__ = "historical_sites"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
