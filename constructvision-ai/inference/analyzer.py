def evaluate_activity(detections: list) -> dict:
    workers = len([d for d in detections if d["class"] == "person"])
    equipment = len([d for d in detections if d["class"] in ["excavator", "crane", "machinery"]])
    vehicles = len([d for d in detections if d["class"] in ["truck", "vehicle"]])
    
    score = 50 + (workers * 2) + (equipment * 5) + (vehicles * 3)
    score = min(100, max(0, score))
    
    activity_level = "low"
    if score > 80:
        activity_level = "high"
    elif score > 60:
        activity_level = "medium"
        
    return {
        "score": score,
        "workers": workers,
        "equipment": equipment,
        "vehicles": vehicles,
        "activity_level": activity_level
    }

def evaluate_site_condition(detections: list) -> dict:
    # A true site condition analyzer requires segmentation or a specialized classifier.
    # We will use a rule-based placeholder mapping object density to congestion.
    
    total_objects = len(detections)
    
    # Simple heuristic for demo
    score = 100 - (total_objects * 0.5)
    score = min(100, max(50, round(score)))
    
    material_congestion = "low"
    if score < 70:
        material_congestion = "high"
    elif score < 85:
        material_congestion = "medium"
        
    return {
        "score": score,
        "debris_detected": score < 75, # Simulated based on low score
        "material_congestion": material_congestion,
        "housekeeping_risk": material_congestion,
        "note": "Visual site condition is estimated from object density. Requires specialized debris detection model for accuracy."
    }

def evaluate_construction_phase(detections: list) -> dict:
    # Placeholder for a classification model.
    # If we see excavators, maybe site prep. 
    has_excavator = any(d["class"] == "excavator" for d in detections)
    has_truck = any(d["class"] in ["truck", "vehicle"] for d in detections)
    
    if has_excavator:
        predicted = "Site Preparation"
        confidence = 0.65
    elif has_truck:
        predicted = "Structural Work"
        confidence = 0.55
    else:
        predicted = "Unknown / insufficient evidence"
        confidence = 0.0
        
    return {
        "predicted": predicted,
        "confidence": confidence
    }
