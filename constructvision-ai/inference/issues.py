def generate_issues(safety: dict, condition: dict, detections: list) -> list:
    issues = []
    
    # Safety issues
    if safety.get("potential_violations", 0) > 0:
        issues.append({
            "issue": "Potential PPE non-compliance",
            "category": "Safety",
            "severity": "High",
            "confidence": 0.85, # Estimated confidence based on detection thresholds
            "evidence": f"{safety['potential_violations']} workers without detectable full PPE",
            "recommendation": "Verify PPE compliance on site immediately."
        })
        
    if safety.get("score", 100) < 70:
        issues.append({
            "issue": "Low Safety Compliance Score",
            "category": "Safety",
            "severity": "Critical",
            "confidence": 0.90,
            "evidence": f"Safety score is {safety['score']}/100",
            "recommendation": "Conduct a full safety stand-down and inspection."
        })
        
    # Condition issues
    if condition.get("debris_detected", False):
        issues.append({
            "issue": "Potential debris or material accumulation",
            "category": "Housekeeping",
            "severity": "Medium",
            "confidence": 0.70,
            "evidence": "High object density detected in site condition analysis",
            "recommendation": "Review material storage and schedule site housekeeping."
        })
        
    if condition.get("material_congestion") == "high":
        issues.append({
            "issue": "Material Congestion",
            "category": "Material",
            "severity": "High",
            "confidence": 0.75,
            "evidence": "Site condition congestion metric is high",
            "recommendation": "Clear obstructed pathways and organize materials."
        })
        
    return issues
