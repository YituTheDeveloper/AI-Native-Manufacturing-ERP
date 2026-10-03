"""
FastAPI Predictive ML Service for AI-Native Manufacturing ERP
Provides endpoints for Demand Forecasting and Procurement/Expense Anomaly Detection.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="AI-Native ERP Predictive ML Service",
    version="1.0.0",
    description="Python FastAPI inference endpoints for ERP demand forecasting and operational anomaly detection."
)

class ForecastRequest(BaseModel):
    sku: str
    tenant_id: str
    historical_months: int = 12

class ForecastResponse(BaseModel):
    sku: str
    model_version: str
    forecasted_demand: float
    confidence_interval_lower: float
    confidence_interval_upper: float
    generated_at: str

class AnomalyRequest(BaseModel):
    tenant_id: str
    transaction_amount: float
    supplier_rating: float
    historical_avg_amount: float

class AnomalyResponse(BaseModel):
    is_anomaly: bool
    anomaly_score: float
    recommendation: str
    model_version: str

@app.get("/")
def read_root():
    return {"status": "ACTIVE", "service": "ERP Predictive ML Inference Service", "version": "1.0.0"}

@app.post("/api/v1/forecast/demand", response_model=ForecastResponse)
def forecast_demand(request: ForecastRequest):
    # Simulated demand forecasting algorithm with model versioning
    base_demand = 120.0 if "ALU" in request.sku else 50.0
    return ForecastResponse(
        sku=request.sku,
        model_version="xgboost-demand-v2.1",
        forecasted_demand=base_demand * 1.15,
        confidence_interval_lower=base_demand * 1.05,
        confidence_interval_upper=base_demand * 1.25,
        generated_at=datetime.utcnow().isoformat()
    )

@app.post("/api/v1/anomalies/detect", response_model=AnomalyResponse)
def detect_anomalies(request: AnomalyRequest):
    # Anomaly detection logic based on z-score ratio and supplier risk
    ratio = request.transaction_amount / max(request.historical_avg_amount, 1.0)
    is_anomaly = ratio > 2.5 or request.supplier_rating < 3.0
    score = min(ratio / 3.0, 1.0)

    rec = "FLAGGED FOR AUDIT: Transaction amount deviates significantly from historical average." if is_anomaly else "NORMAL: Transaction within expected historical variance."

    return AnomalyResponse(
        is_anomaly=is_anomaly,
        anomaly_score=round(score, 3),
        recommendation=rec,
        model_version="isolation-forest-v1.4"
    )
