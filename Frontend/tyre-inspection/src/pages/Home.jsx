import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [gradCamImage, setGradCamImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData);
      setPrediction(response.data.prediction);
      setGradCamImage(response.data.grad_cam);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  const getHandlingInstructions = (prediction) => {
    switch (prediction) {
      case 'Alignment Issue':
        return 'Please check the alignment of your tires. Misalignment can cause uneven tire wear and affect handling. It is recommended to visit a professional service center to get your tire alignment checked and corrected.';
      case 'Inflation Problem':
        return 'Please check the tire pressure. Incorrect tire pressure, whether over or under inflation, can lead to uneven wear patterns. Ensure your tires are inflated to the manufacturer-recommended pressure levels. Consider using a reliable tire pressure gauge to regularly check and maintain proper tire pressure.';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Tyre Inspection</h1>
      <div className="mb-4 w-80">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
          Upload an image of the tyre:
        </label>
        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
      {loading ? (
        <div className="flex items-center justify-center mt-6">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <>
          {uploadedImage && (
            <div className="mt-6 w-80 h-80 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
              <img src={uploadedImage} alt="Uploaded" className="object-cover h-full w-full" />
            </div>
          )}
          {prediction && (
            <div className="mt-6 text-center">
              <p className="text-xl font-semibold">Prediction: {prediction}</p>
              <p className="text-lg mt-2">{getHandlingInstructions(prediction)}</p>
              {gradCamImage && (
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-80 h-80 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
                    <img src={`http://127.0.0.1:8000${gradCamImage}`} alt="Grad-CAM" className="object-cover h-full w-full" />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
