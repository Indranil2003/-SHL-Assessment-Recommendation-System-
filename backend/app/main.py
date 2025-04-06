from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

from app.utils import load_assessment_data
from app.retriever import AssessmentRetriever

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "SHL Recommendation API is live!"}

# ✅ Allow CORS for frontend running on localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data and initialize retriever
data = load_assessment_data("app/data/assessments.csv")
retriever = AssessmentRetriever(data)

class QueryRequest(BaseModel):
    query: str
    top_k: int = 1

@app.post("/recommend")
def recommend_assessments(request: QueryRequest):
    results = retriever.search(request.query, request.top_k)
    return {"recommendations": results}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
