import numpy as np
from typing import List, Dict


class SatorAnalyzer:
    CORRECT = [
        ["S", "A", "T", "O", "R"],
        ["A", "R", "E", "P", "O"],
        ["T", "E", "N", "E", "T"],
        ["O", "P", "E", "R", "A"],
        ["R", "O", "T", "A", "S"],
    ]
    MEANINGS = {
        "SATOR": "The Sower - One who plants seeds",
        "AREPO": "A mysterious word, possibly a name or specialized term",
        "TENET": "Holds - To hold, to master",
        "OPERA": "Works - Labor, deeds, creations",
        "ROTAS": "Wheels - The turning of wheels",
    }

    @classmethod
    def validate(cls, grid: List[List[str]]) -> Dict:
        errors = []
        for r in range(5):
            for c in range(5):
                try:
                    if grid[r][c].upper() != cls.CORRECT[r][c]:
                        errors.append({"row": r, "col": c, "expected": cls.CORRECT[r][c]})
                except (IndexError, AttributeError):
                    errors.append({"row": r, "col": c, "expected": cls.CORRECT[r][c]})
        return {
            "is_valid": len(errors) == 0,
            "errors": errors,
            "message": "Perfect!" if not errors else f"{len(errors)} letters incorrect.",
        }

    @classmethod
    def directions(cls) -> Dict:
        rows = ["".join(r) for r in cls.CORRECT]
        cols = ["".join(cls.CORRECT[i][j] for i in range(5)) for j in range(5)]
        return {
            "right": {"words": rows, "label": "Left to Right"},
            "left": {"words": [r[::-1] for r in rows], "label": "Right to Left"},
            "down": {"words": cols, "label": "Top to Bottom"},
            "up": {"words": [c[::-1] for c in cols], "label": "Bottom to Top"},
            "meanings": cls.MEANINGS,
        }

    @classmethod
    def shuffled_pool(cls) -> List[str]:
        letters = list("".join("".join(r) for r in cls.CORRECT))
        np.random.shuffle(letters)
        return letters
