import uuid
from datetime import datetime
import random

def calculate_overall_score(safety, condition, activity, progress):
    score = (safety * 0.35) + (condition * 0.25) + (activity * 0.20) + (progress * 0.20)
    return round(score)

def run_demo_evaluation(filename: str, project_id: str):
    workers = random.randint(5, 20)
    helmets = max(0, workers - random.randint(0, 4))
    vests = max(0, workers - random.randint(0, 3))
    vehicles = random.randint(1, 5)
    equipment = random.randint(2, 8)
    
    helmet_compliance = round((helmets / workers) * 100) if workers > 0 else 100
    vest_compliance = round((vests / workers) * 100) if workers > 0 else 100
    
    safety_score = round((helmet_compliance + vest_compliance) / 2) - random.randint(0, 10)
    condition_score = random.randint(65, 90)
    activity_score = random.randint(70, 95)
    progress_score = random.randint(40, 85)
    
    overall_score = calculate_overall_score(safety_score, condition_score, activity_score, progress_score)
    
    if overall_score >= 85:
        status = "GOOD — ON TRACK"
        risk = "Low"
    elif overall_score >= 70:
        status = "ATTENTION REQUIRED"
        risk = "Moderate"
    else:
        status = "CRITICAL — IMMEDIATE ACTION REQUIRED"
        risk = "High"

    issues = []
    
    if helmets < workers:
        issues.append({
            "id": str(uuid.uuid4())[:8],
            "title": "Worker without helmet",
            "severity": "HIGH",
            "confidence": f"{random.randint(85, 98)}%",
            "location": "Center-Left",
            "recommendation": "Ensure appropriate PPE compliance before entering the active work area."
        })
        
    if condition_score < 75:
        issues.append({
            "id": str(uuid.uuid4())[:8],
            "title": "Material accumulation / Debris",
            "severity": "MEDIUM",
            "confidence": f"{random.randint(75, 92)}%",
            "location": "Bottom-Right",
            "recommendation": "Review material storage organization and dispatch cleanup crew."
        })
        
    if random.random() > 0.5:
        issues.append({
            "id": str(uuid.uuid4())[:8],
            "title": "Unorganized storage",
            "severity": "LOW",
            "confidence": f"{random.randint(60, 80)}%",
            "location": "Background",
            "recommendation": "Schedule site housekeeping."
        })

    return {
        "analysis_id": str(uuid.uuid4()),
        "date": datetime.now().isoformat(),
        "filename": filename,
        "project_id": project_id,
        "status": status,
        "risk_level": risk,
        "demo_mode": True,
        "overall_score": overall_score,
        "safety": {
            "score": safety_score,
            "helmet_compliance": helmet_compliance,
            "vest_compliance": vest_compliance,
        },
        "site_condition": {
            "score": condition_score
        },
        "activity": {
            "score": activity_score,
            "workers_detected": workers,
            "equipment_detected": equipment,
            "vehicles_detected": vehicles
        },
        "progress": {
            "score": progress_score,
            "structural": min(100, progress_score + random.randint(-5, 5)),
            "finishing": max(0, progress_score - random.randint(20, 40))
        },
        "issues": issues,
        "detections": [
            {"label": "PERSON", "count": workers},
            {"label": "HELMET", "count": helmets},
            {"label": "VEST", "count": vests},
            {"label": "VEHICLE", "count": vehicles},
            {"label": "EQUIPMENT", "count": equipment},
        ],
        "recommendations": [
            "Verify PPE compliance for workers without detectable helmets." if helmets < workers else "Maintain current PPE enforcement.",
            "Review material storage organization." if condition_score < 80 else "Site condition is optimal.",
            "Conduct manual verification of flagged locations."
        ]
    }
