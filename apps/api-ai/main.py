import asyncio
import json
import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, RedirectResponse
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Stack AI Microservice",
    description="Dedicated academic AI microservice for LLM streaming and study tools.",
    version="2.0.0"
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

class AIChatRequest(BaseModel):
    prompt: str
    mode: Optional[str] = "notes"  # notes, flashcards, summarizer, qa, simplifier
    context: Optional[str] = None
    max_tokens: Optional[int] = 1000

class UsageEstimateRequest(BaseModel):
    prompt: str
    context: Optional[str] = None

class PdfQaRequest(BaseModel):
    document_text: str
    question: str

@app.get("/")
def root():
    return {
        "service": "Stack AI Microservice",
        "version": "2.0.0",
        "status": "online",
        "docs_url": "/docs",
        "health_check": "/health",
        "endpoints": {
            "root": "GET /",
            "health": "GET /health",
            "swagger_docs": "GET /docs",
            "text_generation": "POST /generate",
            "ai_chat": "POST /ai/chat",
            "usage_estimate": "POST /ai/usage-estimate",
            "pdf_qa": "POST /ai/pdf-qa"
        }
    }

@app.get("/health")
@app.get("/v1/health")
def health_check():
    return {
        "status": "ok",
        "service": "api-ai",
        "has_openai_key": bool(os.getenv("OPENAI_API_KEY"))
    }

@app.post("/generate")
@app.post("/v1/generate")
def generate_text(request: PromptRequest):
    return {
        "status": "success",
        "completion": f"Mock AI response to: {request.prompt}"
    }

@app.post("/ai/usage-estimate")
@app.post("/v1/ai/usage-estimate")
def usage_estimate(request: UsageEstimateRequest):
    # Estimate ~4 characters per token
    prompt_tokens = (len(request.prompt) + len(request.context or "")) // 4
    estimated_completion_tokens = 250
    total_tokens = prompt_tokens + estimated_completion_tokens
    
    return {
        "status": "success",
        "prompt_tokens": prompt_tokens,
        "estimated_completion_tokens": estimated_completion_tokens,
        "estimated_total_tokens": total_tokens,
        "estimated_credits": max(1, total_tokens // 100)
    }

@app.post("/ai/pdf-qa")
@app.post("/v1/ai/pdf-qa")
def pdf_qa(request: PdfQaRequest):
    chunks = [request.document_text[i:i+500] for i in range(0, len(request.document_text), 500)] if request.document_text else []
    return {
        "status": "success",
        "question": request.question,
        "chunks_indexed": max(1, len(chunks)),
        "answer": f"Based on the provided document ({max(1, len(chunks))} sections indexed):\n\n• Core Answer to '{request.question}': Relevant academic context retrieved successfully from document materials."
    }

async def sse_ai_stream(request: AIChatRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    
    if api_key:
        try:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=api_key)
            
            system_prompts = {
                "notes": "You are Stack AI, an expert academic study assistant. Transform student input into structured, clear notes with bullet points.",
                "flashcards": "You are Stack AI. Generate exactly 5 flashcards for active recall in JSON format.",
                "summarizer": "You are Stack AI. Provide a concise 2-3 sentence executive summary of the provided text.",
                "qa": "You are Stack AI. Answer the student's question clearly and accurately using the context provided.",
                "simplifier": "You are Stack AI. Explain the following complex topic in simple terms (ELI5 style)."
            }
            
            sys_prompt = system_prompts.get(request.mode, system_prompts["notes"])
            user_content = request.prompt
            if request.context:
                user_content = f"Context:\n{request.context}\n\nTask:\n{request.prompt}"

            stream = await client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": sys_prompt},
                    {"role": "user", "content": user_content}
                ],
                stream=True,
                max_tokens=request.max_tokens or 1000
            )

            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    text = chunk.choices[0].delta.content
                    yield f"data: {json.dumps({'content': text})}\n\n"
                    await asyncio.sleep(0.01)
                    
            yield "data: [DONE]\n\n"
            return
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"
            return

    # Mock SSE stream if OPENAI_API_KEY is not configured
    response_text = (
        f"[Stack AI - {request.mode.capitalize()} Mode]\n\n"
        f"Key concepts extracted from prompt:\n"
        f"• Core Focus: {request.prompt}\n"
        f"• Structured Analysis: Processed successfully.\n"
        f"• Study Recommendation: Review active recall flashcards."
    )

    words = response_text.split(" ")
    for word in words:
        yield f"data: {json.dumps({'content': word + ' '})}\n\n"
        await asyncio.sleep(0.05)

    yield "data: [DONE]\n\n"

@app.post("/ai/chat")
@app.post("/v1/ai/chat")
async def chat_ai(request: AIChatRequest):
    return StreamingResponse(
        sse_ai_stream(request),
        media_type="text/event-stream"
    )

@app.get("/ai/chat")
def chat_ai_get_info():
    return {
        "message": "This endpoint requires a POST request with JSON payload containing 'prompt', 'mode', and optional 'context'.",
        "example_payload": {
            "prompt": "Explain Quantum Physics",
            "mode": "notes"
        }
    }
