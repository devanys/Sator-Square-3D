

https://github.com/user-attachments/assets/02723063-3715-41ba-9bee-1a439649e814


A full-stack web application exploring the **Sator Square**, one of the oldest known palindromes in human history. Features a **Three.js 3D stone tablet visualization**, an **interactive puzzle game**, a **reading direction explorer**, and **ML-powered pattern analysis** — all connected through a Python FastAPI backend with React.js frontend.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=flat&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-0.160+-000000?style=flat&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3+-F7931E?style=flat&logo=scikit-learn&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0+-D71F00?style=flat&logo=sqlalchemy&logoColor=white)

---

## What is the Sator Square?

The Sator Square is a five-word Latin palindrome arranged in a 5x5 grid, readable from left-to-right, right-to-left, top-to-bottom, and bottom-to-top — all producing the same five words:

```
S A T O R
A R E P O
T E N E T
O P E R A
R O T A S
```

Discovered in Pompeii (buried 79 AD), it has been found across the Roman Empire and medieval Europe. Its letters can also be rearranged to form two copies of **"PATER NOSTER"** (Our Father) with the letters A and O remaining — symbols of Alpha and Omega in early Christianity.

---

## Architecture

```
+---------------------------------------------+
|           React.js Frontend (Port 5173)     |
|  +----------+ +----------+ +------------+  |
|  | Three.js | |  Puzzle  | |  Explore   |  |
|  |  3D View | |  Game    | |  Modes     |  |
|  +----+-----+ +----+-----+ +------+-----+  |
|       +------------+-------------+          |
|              Services / Hooks                 |
|                    |                        |
|              API Service Layer               |
|                    |                        |
+--------------------+------------------------+
                     | HTTP / Proxy
+--------------------+------------------------+
|         Python FastAPI Backend (Port 8000)  |
|  +----------+ +----------+ +------------+  |
|  | Sator    | | Pattern  | |  Stats     |  |
|  | Analyzer | | Analyzer | |  Service   |  |
|  | (Logic)  | | (ML)     | |            |  |
|  +----+-----+ +----+-----+ +------+-----+  |
|       +------------+-------------+          |
|            Repository Layer                   |
|                    |                        |
|  +-----------------+------------------+      |
|  |   SQLAlchemy + SQLite (ORM)       |      |
|  +-----------------------------------+      |
+---------------------------------------------+
```

### Layer Breakdown

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| **API Server** | Python FastAPI | REST endpoints, CORS, request routing |
| **Service Layer** | Python classes | Business logic: validation, analysis, shuffling |
| **Repository Layer** | SQLAlchemy ORM | Database abstraction: CRUD on SQLite |
| **ML Engine** | scikit-learn + NumPy | Symmetry scoring, entropy calculation, anomaly detection |
| **API Client** | Axios | HTTP requests with automatic fallback to local data |
| **State Management** | React Hooks | usePuzzle, useSatorData — UI state logic |
| **3D Renderer** | Three.js + R3F | Stone tablet with gold letters, particles, orbit controls |
| **Styling** | TailwindCSS 4 | Utility-first CSS with custom theme tokens |

---

## Project Structure

```
sator-square-project/
+-- backend/
|   +-- app/
|   |   +-- __init__.py
|   |   +-- main.py                  # FastAPI app, routes, CORS
|   |   +-- database.py             # SQLAlchemy engine, session
|   |   +-- models.py               # PuzzleAttempt, HistoricalSite ORM
|   |   +-- schemas.py              # Pydantic request/response models
|   |   +-- services/
|   |       +-- __init__.py
|   |       +-- sator_logic.py      # SatorAnalyzer: validate, directions, shuffle
|   |       +-- pattern_analyzer.py # PatternAnalyzer: symmetry, entropy, ML
|   +-- requirements.txt
|   +-- run.py                      # Uvicorn entry point
|
+-- frontend/
|   +-- src/
|   |   +-- main.jsx                # React entry point
|   |   +-- App.jsx                 # Root component, layout
|   |   +-- index.css               # Tailwind + custom theme + keyframes
|   |   +-- utils/
|   |   |   +-- constants.js        # SATOR_SQUARE data, meanings, helpers
|   |   +-- services/
|   |   |   +-- api.js              # Axios client with fallback logic
|   |   +-- hooks/
|   |   |   +-- usePuzzle.js        # Puzzle state machine (timer, pool, grid)
|   |   |   +-- useSatorData.js     # Data fetching for square, stats, sites
|   |   +-- components/
|   |       +-- Navbar.jsx           # Fixed nav with scroll tracking
|   |       +-- HeroSection.jsx      # Animated letter reveal
|   |       +-- Sator3DViewer.jsx    # Three.js 3D stone tablet
|   |       +-- ExploreSection.jsx   # Direction highlight explorer
|   |       +-- PuzzleSection.jsx    # Interactive puzzle game
|   |       +-- TutorialModal.jsx    # Step-by-step tutorial overlay
|   |       +-- HistorySection.jsx   # Historical sites cards
|   +-- index.html
|   +-- vite.config.js              # Vite + Tailwind + API proxy
|   +-- package.json
|
+-- README.md
```

---

## Features

### 1. 3D Stone Tablet Visualization
- **Three.js** with @react-three/fiber and @react-three/drei
- 25 letter blocks arranged on a stone slab
- Gold metallic letter plates with hover glow effects
- Floating dust particles in the scene
- Auto-rotation with orbit controls (drag to rotate, scroll to zoom)
- Dynamic lighting with warm gold and white tones
<img width="2256" height="1504" alt="Screenshot 2026-07-05 132909" src="https://github.com/user-attachments/assets/5f980a69-6913-4b46-b6ef-ae24f2899472" />

### 2. Interactive Puzzle Game
- 25 letters shuffled into a pool
- Click-to-select from pool, click-to-place on 5x5 grid
- Click filled cells to remove letters
- Real-time timer with hint penalty tracking (+15s per hint)
- Hint system that auto-places one correct letter
- Visual feedback: flash on place, shake on wrong, glow celebration on solve
- Tutorial modal with 6 illustrated steps before playing
- Best time and solve count persisted via API
<img width="2256" height="1504" alt="Screenshot 2026-07-05 132928" src="https://github.com/user-attachments/assets/e4d2d867-1199-4b5d-9e83-ae117ce83641" />

### 3. Reading Direction Explorer
- Four directional buttons: Right, Left, Down, Up
- Staggered cell highlighting animation (cascade effect)
- Word chips with Latin meanings appear per direction
- Hover on word chip to highlight corresponding row/column
- "Reveal All" mode for full illumination
<img width="2256" height="1504" alt="Screenshot 2026-07-05 132919" src="https://github.com/user-attachments/assets/7012acc0-8ab3-43d8-92b1-ba47101c55e3" />

### 4. ML Pattern Analysis (Backend)
- **Symmetry Score**: Compares grid against its transpose and 180 degree rotation using NumPy
- **Shannon Entropy**: Calculates letter distribution randomness
- **PATER NOSTER Check**: Verifies if all letters can form two "PATER NOSTER" with A and O remaining
- **Anomaly Detection**: Isolation Forest trained on the known-correct Sator Square to detect if a given grid is anomalous
- All analysis exposed via POST /api/puzzle/analyze

### 5. Historical Sites
- Data fetched from backend API with database seeding
- 5 real archaeological sites: Pompeii, Dura-Europos, Cirencester, Cihampelas, Austria
- Cards with hover animations and gradient reveals
<img width="2256" height="1504" alt="Screenshot 2026-07-05 132937" src="https://github.com/user-attachments/assets/f7bc001e-eb6f-4ebe-839a-46d31ae80efe" />


---

## Tech Stack Details

### Backend

| Package | Purpose |
|---------|---------|
| **FastAPI** | High-performance async web framework with auto-generated Swagger docs |
| **Uvicorn** | ASGI server with hot-reload |
| **SQLAlchemy 2.0** | ORM with declarative models, SQLite backend |
| **Pydantic 2.0** | Request/response validation with type safety |
| **NumPy** | Array operations for symmetry and entropy calculations |
| **scikit-learn** | Isolation Forest for anomaly detection |

### Frontend

| Package | Purpose |
|---------|---------|
| **React 19** | UI component library with hooks |
| **Three.js** | 3D WebGL rendering engine |
| **@react-three/fiber** | React renderer for Three.js (declarative 3D) |
| **@react-three/drei** | Useful Three.js helpers (OrbitControls, Float, Text) |
| **Axios** | HTTP client with interceptors |
| **TailwindCSS 4** | Utility-first CSS framework with CSS theme variables |
| **Vite** | Fast build tool with HMR and API proxy |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/square | All reading directions with meanings |
| GET | /api/puzzle/pool | Generate shuffled letter pool |
| POST | /api/puzzle/validate | Validate a 5x5 grid against correct square |
| POST | /api/puzzle/analyze | ML pattern analysis (symmetry, entropy, PATER NOSTER) |
| POST | /api/puzzle/complete | Save puzzle completion to database |
| GET | /api/stats | Get top 20 completion times |
| GET | /api/sites | Get historical sites (auto-seeded on first call) |

Full interactive API documentation available at http://localhost:8000/docs (Swagger UI).

---

## Getting Started (Windows PowerShell)

### Prerequisites

- **Python 3.8+** (tested on 3.10)
- **Node.js 18+** and npm
- Git

### Step 1: Create project folder

```powershell
mkdir sator-square-project
cd sator-square-project
```

### Step 2: Backend setup

```powershell
mkdir -p backend/app/services
New-Item -ItemType File -Force -Path backend/app/__init__.py
New-Item -ItemType File -Force -Path backend/app/services/__init__.py
```

Create `backend/requirements.txt`:
```
fastapi
uvicorn
sqlalchemy
pydantic
numpy
scikit-learn
```

Create `backend/run.py`:
```python
import uvicorn
if __name__ == "__main__":
    print("=== Sator Square API ===")
    print("Running at http://localhost:8000")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
```

Install and run:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

Verify: open http://localhost:8000/docs (Swagger UI should appear).

### Step 3: Frontend setup

Open a **new terminal**:
```powershell
cd sator-square-project
npm create vite@latest frontend
```

Select **React** > **JavaScript** > **Oxlint** > **Yes** when prompted. Then:

```powershell
cd frontend
npm install three @react-three/fiber @react-three/drei
npm install axios framer-motion
npm install -D tailwindcss @tailwindcss/vite
```

Replace `vite.config.js`, `index.html`, `src/index.css`, and create all source files under `src/components/`, `src/services/`, `src/hooks`, `src/utils/` as shown in the source code.

Remove Vite defaults:
```powershell
Remove-Item -Force src/App.css -ErrorAction SilentlyContinue
```

Run:
```powershell
npm run dev
```

Open **http://localhost:5173** — the app should load with both terminals running.

### Important Notes for Windows

- **Never use `touch`** — it is a Linux command. Use `New-Item -ItemType File -Force` instead
- **Use `python -m venv venv`** with the full Python path if multiple versions are installed
- **Use `reload=False`** in run.py — `reload=True` crashes on Windows
- **Frontend works offline** — if backend is down, all data falls back to local constants
- **Use Python for writing files with backticks** — PowerShell breaks on backticks inside here-strings

---

## Offline Mode

The frontend works **standalone without the backend**. If the API is unavailable, all data falls back to local constants. The puzzle uses client-side validation, and historical sites use hardcoded data.

---

## Design Decisions

- **Color Palette**: Warm dark theme (#080706 abyss, #c4915a ember gold) — inspired by ancient stone and firelight, avoids generic blue/purple schemes
- **Typography**: **Cinzel** (headings — classical Roman feel) + **Cormorant Garamond** (body — elegant serif with light weights)
- **3D Camera**: Angled top-down view (position: [0, 5, 3]) to simulate viewing a real stone tablet lying on a surface
- **Fallback Architecture**: Every API call has a try/catch fallback, making the frontend resilient to backend downtime
- **No SQL Required**: Uses SQLite via SQLAlchemy ORM — zero database setup needed, file-based and portable
- **Tutorial Before Play**: 6-step modal tutorial prevents confusion for first-time users

---

## Sator Square Word Meanings

| Word | Latin | English | Role |
|------|-------|---------|------|
| **SATOR** | Sator, satoris | The sower, planter | The one who plants |
| **AREPO** | *unknown* | Possibly a name or specialized term | Mysterious — unique to this square |
| **TENET** | Tenet, tenere | Holds, keeps | That which holds together |
| **OPERA** | Opera, opus | Works, labor, deeds | The results of labor |
| **ROTAS** | Rota, rotae | Wheels, rotations | The turning of wheels |

---

## License

This project is for personal purposes.

---

## Acknowledgments

- Historical data sourced from archaeological research on Roman-era inscriptions
- 3D visualization inspired by ancient stone carvings and tabula ansata
- The Sator Square itself — a mystery created nearly 2,000 years ago
