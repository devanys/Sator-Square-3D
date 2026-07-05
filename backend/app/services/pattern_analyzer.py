import numpy as np
from typing import List, Dict
from sklearn.ensemble import IsolationForest


class PatternAnalyzer:
    @staticmethod
    def analyze(grid: List[List[str]]) -> Dict:
        arr = np.array(grid)
        flat = arr.flatten()

        transpose_match = float(np.mean(arr == arr.T))
        rot180 = np.rot90(arr, k=2)
        rot_match = float(np.mean(arr == rot180))
        symmetry = (transpose_match + rot_match) / 2

        unique, counts = np.unique(flat, return_counts=True)
        probs = counts / len(flat)
        entropy = float(-np.sum(probs * np.log2(probs)))

        dist = {str(u): int(c) for u, c in zip(unique, counts)}

        all_letters = list(flat)
        pn = list("PATERNOSTER")
        temp = all_letters.copy()
        can_form = True
        for ch in pn:
            if ch in temp:
                temp.remove(ch)
            else:
                can_form = False
                break
        remaining = set(temp)
        has_ao = remaining == {"A", "O"} or remaining == {"O", "A"}

        features = np.array([[symmetry, entropy, len(unique)]])
        clf = IsolationForest(contamination=0.1, random_state=42)
        clf.fit(np.array([[1.0, 2.3219, 5]]))
        is_anomaly = int(clf.predict(features)[0] == -1)

        return {
            "symmetry_score": round(symmetry, 4),
            "entropy": round(entropy, 4),
            "is_perfect_palindrome": transpose_match == 1.0,
            "pater_noster_found": can_form and has_ao,
            "letter_distribution": dist,
            "ml_is_anomaly": is_anomaly,
        }
