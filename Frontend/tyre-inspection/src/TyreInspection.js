// src/TyreInspection.js
import React, { useState } from 'react';
import axios from 'axios';

const TyreInspection = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [gradCamImage, setGradCamImage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
      setGradCamImage(response.data.grad_cam);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Tyre Inspection</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Upload an image of the tyre:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-2 p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
        {prediction && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Prediction: {prediction}</h2>
            {gradCamImage && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Grad-CAM:</h2>
                <img src={`http://127.0.0.1:8000${gradCamImage}`} alt="Grad-CAM" className="mt-2 w-full h-auto" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TyreInspection;
