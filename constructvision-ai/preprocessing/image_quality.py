import cv2
import numpy as np

def check_image_quality(image_path: str) -> dict:
    image = cv2.imread(image_path)
    if image is None:
        return {
            "usable": False,
            "error": "Image could not be loaded."
        }
        
    height, width, _ = image.shape
    resolution = f"{width}x{height}"
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Blur detection (variance of Laplacian)
    blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    # Brightness (average pixel intensity)
    brightness_score = np.mean(gray)
    
    # Contrast (standard deviation of pixel intensity)
    contrast_score = np.std(gray)
    
    usable = True
    visibility = "good"
    
    if blur_score < 100:
        visibility = "poor (blurry)"
        usable = False
    elif brightness_score < 40:
        visibility = "poor (too dark)"
        usable = False
    elif brightness_score > 220:
        visibility = "poor (too bright)"
        usable = False
        
    return {
        "resolution": resolution,
        "blur_score": round(blur_score, 2),
        "brightness_score": round(brightness_score, 2),
        "contrast_score": round(contrast_score, 2),
        "visibility": visibility,
        "usable": usable
    }
