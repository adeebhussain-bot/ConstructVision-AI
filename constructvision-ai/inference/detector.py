import os
from ultralytics import YOLO

class ConstructionDetector:
    def __init__(self, model_path="yolov8n.pt"):
        # We use a pretrained model as a fallback if a custom one isn't available
        # COCO pretrained models detect 'person', 'truck', 'car'
        # For 'helmet', 'vest', 'excavator', custom training is needed.
        self.model = YOLO(model_path)
        
        # Mappings from COCO to our ontology where possible
        self.coco_mapping = {
            0: "person",
            2: "vehicle", # car
            7: "truck",
        }

    def detect(self, image_path: str):
        results = self.model(image_path)
        
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                cls_id = int(box.cls[0].item())
                conf = float(box.conf[0].item())
                
                # Get bounding box coordinates
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                
                # If custom model, use its names. If COCO, map to our ontology.
                if hasattr(self.model, 'names') and 'helmet' in self.model.names.values():
                    label = self.model.names[cls_id]
                else:
                    # Fallback mapping
                    label = self.coco_mapping.get(cls_id, self.model.names.get(cls_id, "unknown"))
                
                # Only keep relevant classes
                if label in ["person", "vehicle", "truck", "helmet", "safety vest", "excavator", "machinery", "car"]:
                    if label == "car":
                        label = "vehicle"
                        
                    detections.append({
                        "class": label,
                        "confidence": round(conf, 2),
                        "bounding_box": [round(x1, 2), round(y1, 2), round(x2, 2), round(y2, 2)]
                    })
                    
        return detections
