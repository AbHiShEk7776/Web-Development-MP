import React, { useState, useEffect } from "react";
import StockPrediction from "./Recos"; // Import the StockPrediction component

const ParentComponent = () => {
  const [predictions, setPredictions] = useState(null); // State to store predictions data
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to store any error

  // Fetch predictions data from the API
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch("/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPredictions(data); // Set the predictions data to state
      } catch (err) {
        setError(err.message); // Set error if fetching fails
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchPredictions();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // If data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error while fetching, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pass the predictions data to the StockPrediction component
  return (
    <div>
      <StockPrediction predictions={predictions} />
    </div>
  );
};

export default ParentComponent;
