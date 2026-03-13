from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import shutil
import os
import uvicorn
from parser import extract_bill_data, generate_recommendations
from model import detector

app = FastAPI(title="AI Module - Energy Waste Detector")

class UsageData(BaseModel):
    device_id: str
    power_usage: float

@app.on_event("startup")
def startup_event():
    # In a real app we would load historical data and train the model
    # Here we mock training the model with some normal baseline data
    import pandas as pd
    import numpy as np
    # Normal usage around 300-500 W
    mock_data = pd.DataFrame({"powerUsage": np.random.normal(400, 50, 1000)})
    detector.train(mock_data)
    print("IsolationForest Model Trained on Mock Baseline Data")

@app.get("/")
def read_root():
    return {"status": "AI Module is running correctly"}

@app.post("/parse-bill")
async def parse_bill(file: UploadFile = File(...)):
    # Save uploaded file temporarily for parsing
    temp_file = f"temp_{file.filename}"
    try:
        with open(temp_file, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Extract data using our parser logic
        parsed_data = extract_bill_data(temp_file)
        
        # Generate recommendations based on the bill
        insights = generate_recommendations(parsed_data)
        
        return {
            "success": True,
            "filename": parsed_data.get("filename"),
            "billingPeriod": parsed_data.get("billingPeriod"),
            "totalKWh": parsed_data.get("totalKWh"),
            "totalCost": parsed_data.get("totalCost"),
            "insights": insights
        }
    finally:
        # Cleanup temp file
        if os.path.exists(temp_file):
            os.remove(temp_file)

@app.post("/predict")
def predict_anomaly(data: UsageData):
    # Determine if the current power usage is an anomaly
    result = detector.predict(data.power_usage)
    return {
        "device_id": data.device_id,
        "current_usage": data.power_usage,
        "is_anomaly": result.get("is_anomaly"),
        "anomaly_score": result.get("anomaly_score")
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
