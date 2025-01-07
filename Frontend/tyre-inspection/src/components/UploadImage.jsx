import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ setResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center mt-8">
      <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-2">Upload</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default UploadImage;
