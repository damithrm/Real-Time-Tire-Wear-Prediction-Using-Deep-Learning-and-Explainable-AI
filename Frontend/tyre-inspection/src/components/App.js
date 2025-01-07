import React, { useState } from 'react';
import Introduction from './Introduction';
import ImageUploadForm from './ImageUploadForm';
import PredictionResults from './PredictionResults';
import Navbar from './Navbar';
import Footer from './Footer';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [gradCamImage, setGradCamImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto p-4">
        <Introduction />
        <ImageUploadForm 
          setPrediction={setPrediction} 
          setGradCamImage={setGradCamImage}
          setUploadedImage={setUploadedImage}
          setLoading={setLoading}
        />
        {loading && <div className="mt-4 text-center">Loading...</div>}
        {prediction && gradCamImage && (
          <PredictionResults 
            prediction={prediction} 
            gradCamImage={gradCamImage}
            uploadedImage={uploadedImage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
