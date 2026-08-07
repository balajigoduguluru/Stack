from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Stack AI Service",
    description="Dedicated microservice for LLM and LangChain orchestration.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "api-ai"}

@app.post("/generate")
def generate_text(request: PromptRequest):
    # Placeholder for actual LangChain/OpenAI logic
    return {
        "status": "success", 
        "completion": f"Mock AI response to: {request.prompt}"
    }
