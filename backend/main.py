from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your trained model
with open("user_behavior_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask API is running!",
        "endpoints": ["/predict (POST)"]
    })

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    # Adjust this part depending on your model's expected input format
    features = np.array(data["features"]).reshape(1, -1)
    prediction = model.predict(features)
    return jsonify({"prediction": prediction.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
