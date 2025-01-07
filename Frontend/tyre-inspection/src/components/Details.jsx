const Details = () => {
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Tire Wear Types</h1>
        <img src={require('../assets/tire_wear_types.png')} alt="Tire Wear Types" className="w-full mb-4" />
        <p className="text-lg">
          Different types of tire wear can indicate various issues with your vehicle's alignment, inflation, or suspension.
        </p>
        <ul className="list-disc list-inside mt-4">
          <li><strong>Toe Wear:</strong> Often caused by incorrect toe alignment.</li>
          <li><strong>Camber Wear:</strong> Results from improper camber alignment.</li>
          <li><strong>Center Wear:</strong> Indicates over-inflation.</li>
          <li><strong>Edge Wear:</strong> Suggests under-inflation.</li>
          <li><strong>Patch Wear:</strong> Can be due to out-of-balance tires.</li>
          <li><strong>Cup Wear:</strong> Caused by worn-out suspension components.</li>
        </ul>
      </div>
    );
  };
  
  export default Details;
  