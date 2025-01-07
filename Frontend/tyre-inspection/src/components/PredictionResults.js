import React from 'react';

const PredictionResults = ({ prediction, gradCamImage, uploadedImage }) => {
  const recommendations = {
    "Alignment Issue": "Ensure your wheels are aligned properly by a professional. Misalignment can lead to uneven tire wear and handling issues.",
    "Inflation Problem": "Check and adjust the tire pressure to the recommended levels. Under or over-inflation can cause uneven wear and affect vehicle performance."
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Prediction Results</h2>
      <div className="mb-4">
        <img src={uploadedImage} alt="Uploaded Tire" className="mb-4 w-full object-cover h-64 rounded-lg" />
        <h3 className="text-xl font-semibold">Prediction: {prediction}</h3>
        <p>{recommendations[prediction]}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Grad-CAM Visualization</h3>
        <img src={gradCamImage} alt="Grad-CAM" className="w-full object-cover h-64 rounded-lg" />
      </div>
    </div>
  );
};

export default PredictionResults;
