import cv2
import numpy as np
import os

def analyze_progress(ref_image_path: str, curr_image_path: str, output_path: str) -> dict:
    if not os.path.exists(ref_image_path) or not os.path.exists(curr_image_path):
        return {
            "error": "One or both images do not exist."
        }
        
    ref = cv2.imread(ref_image_path)
    curr = cv2.imread(curr_image_path)
    
    if ref is None or curr is None:
        return {"error": "Could not load images."}
        
    # Resize to match for simple comparison (assuming same camera angle for demo)
    curr = cv2.resize(curr, (ref.shape[1], ref.shape[0]))
    
    ref_gray = cv2.cvtColor(ref, cv2.COLOR_BGR2GRAY)
    curr_gray = cv2.cvtColor(curr, cv2.COLOR_BGR2GRAY)
    
    # Compute absolute difference
    diff = cv2.absdiff(ref_gray, curr_gray)
    
    # Thresholding
    _, thresh = cv2.threshold(diff, 50, 255, cv2.THRESH_BINARY)
    
    # Calculate percentage of changed pixels
    changed_pixels = np.count_nonzero(thresh)
    total_pixels = thresh.shape[0] * thresh.shape[1]
    change_ratio = changed_pixels / total_pixels
    
    change_detected = change_ratio > 0.05
    
    # Create comparison image
    # We can stack them: [ref, curr, diff (colorized)]
    diff_colored = cv2.applyColorMap(diff, cv2.COLORMAP_JET)
    combined = np.hstack((ref, curr, diff_colored))
    
    cv2.imwrite(output_path, combined)
    
    if not change_detected:
        return {
            "change_detected": False,
            "observations": ["No significant visible changes detected."],
            "confidence": 0.85
        }
        
    return {
        "change_detected": True,
        "estimated_progress_change": round(change_ratio * 100, 2), # arbitrary proxy
        "confidence": 0.74,
        "observations": [
            f"Significant visual changes detected ({round(change_ratio * 100, 2)}% area).",
            "Possible new structural elements or material movement."
        ],
        "comparison_image": output_path
    }
