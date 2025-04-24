'use client';

import { useState } from 'react';

export default function PredictForm() {
  const [result, setResult] = useState<string | null>(null);

  const handlePredict = async () => {
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          features: [1, 2, 3, 4], // Replace with actual input values
        }),
      });

      const data = await res.json();
      setResult(JSON.stringify(data.prediction));
    } catch (error) {
      console.error('Prediction failed:', error);
      setResult('Error fetching prediction');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ML Prediction</h1>
      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Predict
      </button>
      {result && <p className="mt-4">Prediction: {result}</p>}
    </div>
  );
}
