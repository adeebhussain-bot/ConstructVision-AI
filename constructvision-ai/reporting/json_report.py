import json
import uuid
from datetime import datetime

def generate_json_report(quality, detections, phase, safety, condition, activity, progress, issues, score, output_path: str):
    
    recommendations = [issue["recommendation"] for issue in issues]
    
    report = {
        "analysis_id": str(uuid.uuid4()),
        "timestamp": datetime.now().isoformat(),
        "image_quality": quality,
        "detections": detections,
        "construction_phase": phase,
        "safety": safety,
        "site_condition": condition,
        "activity": activity,
        "progress": progress,
        "issues": issues,
        "recommendations": list(set(recommendations)),
        "overall_score": score["overall_score"],
        "risk_level": score["risk_level"],
        "limitations": [
            "This analysis is based on visual evidence and should not replace professional construction inspection.",
            "Detections rely on a pretrained model; custom construction classes (helmet, vest, etc.) require specialized training data."
        ]
    }
    
    with open(output_path, "w") as f:
        json.dump(report, f, indent=4)
        
    return report
