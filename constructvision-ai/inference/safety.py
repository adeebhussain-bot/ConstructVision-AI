def evaluate_safety(detections: list) -> dict:
    workers = [d for d in detections if d["class"] == "person"]
    helmets = [d for d in detections if d["class"] == "helmet"]
    vests = [d for d in detections if d["class"] == "safety vest"]
    
    num_workers = len(workers)
    num_helmets = len(helmets)
    num_vests = len(vests)
    
    # If no workers detected, we can't evaluate worker safety properly.
    if num_workers == 0:
        return {
            "score": 100,
            "helmet_compliance": 100,
            "vest_compliance": 100,
            "potential_violations": 0,
            "risk_level": "low",
            "note": "No workers detected. Insufficient visual evidence for safety compliance."
        }
    
    # If no helmets or vests are detected at all, it might be due to a lack of a custom trained model.
    # We cap compliance at 100%.
    helmet_compliance = min(100, round((num_helmets / num_workers) * 100)) if num_helmets > 0 else 0
    vest_compliance = min(100, round((num_vests / num_workers) * 100)) if num_vests > 0 else 0
    
    # Simple rule-based logic
    potential_violations = max(0, num_workers - num_helmets) + max(0, num_workers - num_vests)
    score = round((helmet_compliance + vest_compliance) / 2)
    
    risk_level = "low"
    if score < 70:
        risk_level = "high"
    elif score < 90:
        risk_level = "medium"
        
    result = {
        "score": score,
        "helmet_compliance": helmet_compliance,
        "vest_compliance": vest_compliance,
        "potential_violations": potential_violations,
        "risk_level": risk_level
    }
    
    if num_helmets == 0 and num_vests == 0:
        result["note"] = "No PPE detected. This may indicate a severe violation or lack of a PPE-trained computer vision model."
        
    return result
