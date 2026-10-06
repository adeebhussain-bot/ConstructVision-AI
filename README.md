# ConstructVision AI

ConstructVision AI is an intelligent construction-site image evaluation and reporting system. It uses computer vision to analyze construction site images, detect workers and machinery, evaluate site safety, and assess construction progress.

## Project Architecture

The project is divided into two main components:
1. **The Web Dashboard (Frontend)**: Built with React, Vite, and Tailwind CSS.
2. **The Core AI Engine (Backend/CLI)**: Built with Python, FastAPI, Ultralytics (YOLOv8), and OpenCV.

---

## 1. The Core AI Engine (`/constructvision-ai`)

The intelligence of the platform lives in the `constructvision-ai` folder. It is designed as a standalone, highly modular computer vision pipeline.

### How It Works

When an image is passed to the AI engine, it runs through the following pipeline:
1. **Preprocessing (`image_quality.py`)**: Checks if the image is too blurry, too dark, or too low resolution to be analyzed safely.
2. **Detection (`detector.py`)**: Runs a YOLOv8 object detection model to find bounding boxes for workers (persons), vehicles, and heavy equipment.
3. **Safety Analysis (`safety.py`)**: Applies rule-based logic to determine if workers are wearing proper Personal Protective Equipment (PPE) such as hard hats and vests. *(Note: The current generic model requires fine-tuning on construction data to recognize PPE perfectly).*
4. **Site Condition & Activity (`analyzer.py`)**: Calculates a score based on the density of workers and active machinery to evaluate site activity levels.
5. **Issues Generation (`issues.py`)**: Flags any detected anomalies (like missing safety gear) as warnings or critical violations.
6. **Scoring (`scoring.py`)**: Aggregates all metrics into a final "Overall Risk Score" out of 100.
7. **Reporting (`json_report.py`)**: Generates a structured JSON report and saves an annotated version of the image with drawn bounding boxes.

### How to Run the AI Engine Manually (CLI)

If you want to run the AI pipeline directly from your terminal on a single image, without the web interface:

1. Open your terminal and navigate to the AI folder:
   ```powershell
   cd constructvision-ai
   ```
2. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\activate
   ```
3. Run the prediction script on any image:
   ```powershell
   python predict.py --image "C:\path\to\your\image.jpg"
   ```

The script will output the scores to the console and save the final reports to `constructvision-ai/outputs/`.

---

## 2. The Web Dashboard & API Integration

We have integrated the Python AI engine directly into the React Web Dashboard using a **FastAPI** wrapper.

### How It Works

1. **Upload**: A user uploads an image via the React frontend.
2. **API Request**: The frontend sends the image to `http://localhost:8000/api/analyze` (the FastAPI server).
3. **Processing**: The FastAPI server (`api.py`) temporarily saves the image, passes it through the exact same Python AI pipeline described above, and generates the scores and the annotated image.
4. **Display**: FastAPI sends the JSON data and the URL of the annotated image back to the frontend, which dynamically updates the charts, issue lists, and displays the image.

### How to Run the Full Application

To run the complete web application, you need to run **both** the backend API and the frontend UI simultaneously in two separate terminals.

**Terminal 1: Start the AI Backend (FastAPI)**
```powershell
cd constructvision-ai
.\venv\Scripts\activate
uvicorn api:app --reload
```
*(This starts the backend on port 8000)*

**Terminal 2: Start the Web Frontend (React)**
```powershell
# From the root "construction ai" folder
npm run dev
```
*(This starts the frontend on port 5173)*

Now, open your browser to `http://localhost:5173`. When you upload an image on the Image Analysis page, it will automatically connect to your Python AI engine, run the computer vision analysis, and display the results live!
