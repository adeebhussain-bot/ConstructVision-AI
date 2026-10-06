def calculate_overall_score(safety: dict, condition: dict, activity: dict, progress_score: float = 70.0) -> dict:
    safety_s = safety.get("score", 0)
    condition_s = condition.get("score", 0)
    activity_s = activity.get("score", 0)
    
    overall = (safety_s * 0.35) + (condition_s * 0.25) + (activity_s * 0.20) + (progress_score * 0.20)
    overall = round(overall, 2)
    
    risk_level = "Low"
    status = "Good"
    
    if overall < 60:
        risk_level = "Critical"
        status = "Immediate Action Required"
    elif overall < 75:
        risk_level = "High"
        status = "Action Required"
    elif overall < 85:
        risk_level = "Medium"
        status = "Attention Required"
        
    return {
        "overall_score": overall,
        "risk_level": risk_level,
        "status": status
    }
