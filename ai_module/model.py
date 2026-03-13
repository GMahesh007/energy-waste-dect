import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

class AnomalyDetector:
    def __init__(self):
        # contamination depends on the expected proportion of anomalies.
        self.model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
        self.is_trained = False

    def train(self, data: pd.DataFrame):
        """
        Expects a DataFrame with a 'powerUsage' column to train the baseline.
        """
        if 'powerUsage' not in data.columns:
            raise ValueError("Data must compel a 'powerUsage' column.")
            
        X = data[['powerUsage']].values
        self.model.fit(X)
        self.is_trained = True

    def predict(self, current_usage: float) -> dict:
        """
        Predict if the current usage is an anomaly compared to the trained baseline.
        """
        if not self.is_trained:
            # If not trained, we can't reliably detect anomalies, but we can mock it
            return {"is_anomaly": False, "score": 0.0}
            
        X_test = np.array([[current_usage]])
        prediction = self.model.predict(X_test)[0]
        score = self.model.decision_function(X_test)[0]
        
        # IsolationForest returns -1 for outliers and 1 for inliers.
        is_anomaly = True if prediction == -1 else False
        
        return {
            "is_anomaly": is_anomaly,
            "anomaly_score": float(score)
        }

# Global instance
detector = AnomalyDetector()
