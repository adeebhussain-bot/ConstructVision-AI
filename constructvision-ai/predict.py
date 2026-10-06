import argparse
import os
import cv2
from preprocessing.image_quality import check_image_quality
from inference.detector import ConstructionDetector
from inference.safety import evaluate_safety
from inference.analyzer import evaluate_activity, evaluate_site_condition, evaluate_construction_phase
from inference.scoring import calculate_overall_score
from inference.issues import generate_issues
from reporting.json_report import generate_json_report
from comparison.progress import analyze_progress

def draw_boxes(image_path, detections, output_path):
    img = cv2.imread(image_path)
    if img is None:
        return
        
    for det in detections:
        box = det["bounding_box"]
        x1, y1, x2, y2 = map(int, box)
        label = f"{det['class']} ({det['confidence']})"
        
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, label, (x1, max(y1-10, 0)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
    cv2.imwrite(output_path, img)

def main():
    parser = argparse.ArgumentParser(description="ConstructVision AI - Core Pipeline")
    parser.add_argument("--image", type=str, help="Path to single construction image for analysis")
    parser.add_argument("--reference", type=str, help="Path to reference image for progress comparison")
    parser.add_argument("--current", type=str, help="Path to current image for progress comparison")
    
    args = parser.parse_args()
    
    # Initialize detector (this will download yolov8n.pt if not present)
    detector = ConstructionDetector()
    
    if args.image:
        print("Analyzing image...")
        
        # 1. Image Quality
        quality = check_image_quality(args.image)
        if not quality["usable"]:
            print(f"Image Quality: POOR - {quality['visibility']}")
            print("Cannot proceed with reliable analysis.")
            return
            
        print("Image Quality: GOOD")
        
        # 2. Object Detection
        detections = detector.detect(args.image)
        
        workers = len([d for d in detections if d["class"] == "person"])
        vehicles = len([d for d in detections if d["class"] in ["truck", "vehicle"]])
        equipment = len([d for d in detections if d["class"] in ["excavator", "machinery", "crane"]])
        
        print("\nObjects:")
        print(f"Workers: {workers}")
        print(f"Vehicles: {vehicles}")
        print(f"Equipment: {equipment}")
        
        # 3. Safety Analysis
        safety = evaluate_safety(detections)
        print(f"\nSafety Score: {safety['score']}/100")
        
        # 4. Site Condition
        condition = evaluate_site_condition(detections)
        print(f"Site Condition: {condition['score']}/100")
        
        # 5. Activity Analysis
        activity = evaluate_activity(detections)
        print(f"Activity Score: {activity['score']}/100")
        
        # 6. Construction Phase
        phase = evaluate_construction_phase(detections)
        print(f"Construction Phase:\n{phase['predicted']} ({phase['confidence']})")
        
        # (Optional Progress if --reference not provided is empty)
        progress = {}
        
        # 7. Issue Detection
        issues = generate_issues(safety, condition, detections)
        print(f"\nPotential Issues: {len(issues)}")
        for idx, issue in enumerate(issues, 1):
            print(f"{idx}. {issue['issue']} (Severity: {issue['severity']})")
            
        # 8. Scoring
        score = calculate_overall_score(safety, condition, activity)
        print(f"\nOverall Score: {score['overall_score']}/100")
        print(f"Risk Level: {score['risk_level']}")
        print(f"Status: {score['status']}")
        
        # 9. Reporting
        basename = os.path.basename(args.image).split('.')[0]
        json_out = f"outputs/reports/{basename}_report.json"
        generate_json_report(quality, detections, phase, safety, condition, activity, progress, issues, score, json_out)
        print(f"\nReport saved to: {json_out}")
        
        # 10. Annotated Image
        ann_out = f"outputs/annotated/{basename}_analyzed.jpg"
        draw_boxes(args.image, detections, ann_out)
        print(f"Annotated image: {ann_out}")
        
    elif args.reference and args.current:
        print("Comparing construction images...")
        comp_out = f"outputs/comparisons/progress_diff.png"
        progress = analyze_progress(args.reference, args.current, comp_out)
        
        if "error" in progress:
            print(progress["error"])
            return
            
        if progress["change_detected"]:
            print("Visible changes detected.")
            print(f"Progress confidence: {progress['confidence']}")
            for obs in progress["observations"]:
                print(f"- {obs}")
        else:
            print("No visible changes detected.")
            
        print(f"\nComparison saved to: {comp_out}")
        
    else:
        print("Provide --image for single analysis, or --reference and --current for comparison.")

if __name__ == "__main__":
    main()
