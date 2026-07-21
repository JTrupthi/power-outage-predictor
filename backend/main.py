from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os
import joblib
import pandas as pd

from models import PredictionRequest
from weather import get_weather, get_forecast

app = FastAPI(
    title="Power Outage Prediction API",
    description="Backend API using Live Weather",
    version="3.0.0",
)

allowed_origins = [
    "http://localhost:5173",
    "https://power-outage-predictor-1.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("../model/power_outage_model.pkl")
label_encoder = joblib.load("../model/label_encoder.pkl")


@app.get("/")
def home():
    return {
        "message": "Power Outage Prediction API 🚀"
    }


@app.post("/predict")
def predict(request: PredictionRequest):

    weather = get_weather(request.district)

    if weather is None:
        return {
            "error": "Unable to fetch weather data."
        }

    forecast = get_forecast(request.district)

    input_data = pd.DataFrame(
        [
            {
                "rainfall": weather["rainfall"],
                "humidity": weather["humidity"],
                "wind_speed": weather["wind_speed"],
                "temperature": weather["temperature"],
                "lightning": weather["lightning"],
            }
        ]
    )

    prediction = model.predict(input_data)

    probabilities = model.predict_proba(input_data)

    confidence = round(max(probabilities[0]) * 100, 2)

    risk = label_encoder.inverse_transform(prediction)[0]

    return {
        "district": request.district,
        "predicted_risk": risk,
        "confidence": confidence,
        "weather": {
            "temperature": weather["temperature"],
            "humidity": weather["humidity"],
            "wind_speed": weather["wind_speed"],
            "rainfall": weather["rainfall"],
            "description": weather["description"],
        },
        "forecast": forecast,
    }