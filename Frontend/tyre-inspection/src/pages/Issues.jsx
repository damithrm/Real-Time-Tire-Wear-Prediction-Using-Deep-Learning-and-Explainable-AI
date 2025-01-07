import React from 'react';
import { Link } from 'react-router-dom';
import toeWearImage from '../assets/toe_wear_image.jpg';
import camberWearImage from '../assets/camber_wear_image.jpg';
import overinflationWearImage from '../assets/overinflation_wear_image.jpg';
import underinflationWearImage from '../assets/underinflation_wear_image.jpg';
import patchWearImage from '../assets/patch_wear_image.jpg';
import cupWearImage from '../assets/cup_wear_image.jpg';

const issuesData = [
  {
    title: "Toe Wear",
    description: "Toe wear occurs when the tires are not aligned correctly and the front of the tires point either inwards or outwards. This misalignment causes uneven wear on the edges of the tire tread.",
    image: toeWearImage,
  },
  {
    title: "Camber Wear",
    description: "Camber wear is caused by improper camber alignment, where the top of the tire tilts either inward or outward. This results in wear on one side of the tire tread.",
    image: camberWearImage,
  },
  {
    title: "Overinflation Wear",
    description: "Overinflation wear happens when the tire is over-inflated, causing the center of the tire to contact the road more than the edges. This leads to faster wear in the middle of the tire tread.",
    image: overinflationWearImage,
  },
  {
    title: "Underinflation Wear",
    description: "Underinflation wear is typically caused by under-inflation, where the edges of the tire contact the road more than the center. This leads to faster wear on the outer edges of the tire tread.",
    image: underinflationWearImage,
  },
  {
    title: "Patch Wear",
    description: "Patch wear occurs due to imbalanced tires or improper suspension, causing uneven contact between the tire and the road surface. This results in irregular wear patches on the tire tread.",
    image: patchWearImage,
  },
  {
    title: "Cup Wear",
    description: "Cup wear, also known as scalloping, is caused by worn suspension components or imbalanced tires. This results in a series of high and low points on the tire tread.",
    image: cupWearImage,
  },
];

const Issues = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Tire Wear Issues</h1>
      <div className="container w-1/3 mx-auto mt-8">
        
        <img src={require('../assets/tire_wear_types.png')} alt="Tire Wear Types" className="w-full mb-4" />

      </div>
      <div className="container mx-auto">
        {issuesData.map((issue, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">{issue.title}</h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3">
                <img src={issue.image} alt={issue.title} className="w-full h-auto rounded-lg" />
              </div>
              <div className="md:w-2/3 md:ml-6">
                <p className="text-gray-700">{issue.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
};

export default Issues;
