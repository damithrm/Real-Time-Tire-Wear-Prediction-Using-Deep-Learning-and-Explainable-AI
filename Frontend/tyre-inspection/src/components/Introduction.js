import React from 'react';
import tireWearTypes from '../assets/tire_wear_types.png';

const Introduction = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Introduction</h2>
      <p className="mb-4">
        Welcome to the Tire Wear Detection System. This tool helps you detect and classify tire wear using advanced deep learning models.
      </p>
      <h3 className="text-xl font-semibold mb-2">Types of Tire Wear</h3>
      <img src={tireWearTypes} alt="Types of Tire Wear" className="mb-4 w-full object-cover rounded-lg" />
      <p className="mb-4">Tire wear can be caused by various issues, including:</p>
      <ul className="list-disc ml-5 mb-4">
        <li>Alignment Problems: Misaligned wheels can cause uneven tire wear.</li>
        <li>Inflation Problems: Under-inflated or over-inflated tires can lead to abnormal wear patterns.</li>
        <li>Worn-out Suspension: Damaged suspension components can cause irregular tire wear.</li>
        <li>Imbalance: Imbalanced tires can lead to patch wear and other issues.</li>
      </ul>
      <p>
        Depending on the prediction, you will receive guidance on how to handle alignment issues, inflation problems, and other common tire wear issues.
      </p>
    </div>
  );
};

export default Introduction;
