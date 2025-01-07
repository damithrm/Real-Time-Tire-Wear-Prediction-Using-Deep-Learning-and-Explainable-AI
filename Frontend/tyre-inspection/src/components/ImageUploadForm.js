import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = ({ setPrediction, setGradCamImage, setUploadedImage, setLoading }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploadedImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData);
      setPrediction(response.data.prediction);
      setGradCamImage(`http://127.0.0.1:8000${response.data.grad_cam}`);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Upload Tire Image</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Upload
      </button>
    </form>
  );
};

export default ImageUploadForm;
