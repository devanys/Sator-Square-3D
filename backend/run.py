import uvicorn

if __name__ == "__main__":
    print("=== Sator Square API ===")
    print("Running at http://localhost:8000")
    print("Swagger docs: http://localhost:8000/docs")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
