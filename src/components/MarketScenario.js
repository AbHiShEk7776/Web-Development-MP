import React, { useState, useEffect } from "react";
import { useTheme } from './theme-provider'; 

const MarketScenario = () => {
    const { theme } = useTheme();
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarketData = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await fetch(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-summary?region=IN',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '85be2e916amsh54437773043bb62p160d43jsn5d75d2afa99e',  // Replace with your actual API key
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Log the data for debugging

      if (data.marketSummaryAndSparkResponse && data.marketSummaryAndSparkResponse.result) {
        setMarketData(data.marketSummaryAndSparkResponse.result); // Extract data for display
      } else {
        setError("Data not available.");
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className="p-4">
      <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        Current Market Scenario
      </h2>
      {loading ? (
        <p>Loading market data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className={`space-y-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg`}>
          {marketData.length > 0 ? (
            marketData.map((index) => (
              <li key={index.symbol} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                <h3 className="font-semibold text-lg">{index.shortName}</h3>
                <p>Price: {index.regularMarketPrice?.fmt || "N/A"}</p>
                <p>
                  Change: {index.regularMarketChange?.fmt || "N/A"} (
                  {index.regularMarketChangePercent?.fmt || "N/A"})
                </p>
                <p>Market Time: {index.regularMarketTime?.fmt || "N/A"}</p>
              </li>
            ))
          ) : (
            <li>No data available at the moment.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MarketScenario;
