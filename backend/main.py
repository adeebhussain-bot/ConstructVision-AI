from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time
from services.evaluation import run_demo_evaluation

app = FastAPI(title="ConstructVision AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze_image(image: UploadFile = File(...), project_id: str = Form("default")):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    # Read the image bytes (In a real app, pass to OpenCV here)
    content = await image.read()

    # Simulate processing time
    time.sleep(1.5)

    # Use demo evaluation
    result = run_demo_evaluation(image.filename, project_id)
    return result

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
