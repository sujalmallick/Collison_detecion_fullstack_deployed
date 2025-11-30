# server.py     #master branch on git
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from camera import startapplication

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/detect")
async def detect_accident(video: UploadFile = File(...)):
    try:
        video_path = os.path.join(UPLOAD_DIR, video.filename)

        with open(video_path, "wb") as f:
            f.write(await video.read())

        image_path = startapplication(video_path)

        if image_path and os.path.exists(image_path):
            return FileResponse(
                image_path,
                media_type="image/jpeg",
                filename=os.path.basename(image_path)
            )
        else:
            return JSONResponse({"message": "No accident detected"}, status_code=200)

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
