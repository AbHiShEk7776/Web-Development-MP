// src/pages/savePortfolio.js
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";

const SavePortfolio = () => {
  const navigate = useNavigate();

  // State for each field based on schema
  const [portfolioSummary, setPortfolioSummary] = useState([{ month: "", totalValue: 0 }]);
  const [assetAllocation, setAssetAllocation] = useState({ stocks: 0, bonds: 0, cash: 0, realEstate: 0 });
  const [holdings, setHoldings] = useState([{ companyName: "", totalShares: 0 }]);

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/portfolio/save", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ portfolioSummary, assetAllocation, holdings })
      });
      if (response.ok) {
        navigate("/dashboard"); // Redirect after saving
      }
    } catch (error) {
      console.error("Failed to save portfolio:", error);
    }
  };

  // Handlers for dynamic fields
  const handlePortfolioSummaryChange = (index, field, value) => {
    const updatedSummary = [...portfolioSummary];
    updatedSummary[index][field] = value;
    setPortfolioSummary(updatedSummary);
  };

  const addPortfolioSummary = () => {
    if (portfolioSummary.length < 6) { // Limit of 6 entries
      setPortfolioSummary([...portfolioSummary, { month: "", totalValue: 0 }]);
    }
  };

  const handleHoldingsChange = (index, field, value) => {
    const updatedHoldings = [...holdings];
    updatedHoldings[index][field] = value;
    setHoldings(updatedHoldings);
  };

  const addHolding = () => {
    if (holdings.length < 7) { // Limit of 7 entries
      setHoldings([...holdings, { companyName: "", totalShares: 0 }]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600 dark:text-blue-300">Create Your Portfolio</h1>

      {/* Portfolio Summary Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Portfolio Summary</h2>
        {portfolioSummary.map((entry, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Month</Label>
              <Input
                type="text"
                value={entry.month}
                onChange={(e) => handlePortfolioSummaryChange(index, "month", e.target.value)}
                placeholder="e.g., Jan 2024"
                className="border dark:border-gray-600 rounded-lg px-4 py-2 mb-2 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Total Value</Label>
              <Input
                type="number"
                value={entry.totalValue}
                onChange={(e) => handlePortfolioSummaryChange(index, "totalValue", parseFloat(e.target.value))}
                placeholder="Enter total value"
                className="border dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        ))}
        <Button onClick={addPortfolioSummary} disabled={portfolioSummary.length >= 6} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-700 dark:text-gray-200">
          + Add Month
        </Button>
      </div>

      {/* Asset Allocation Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Asset Allocation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["stocks", "bonds", "cash", "realEstate"].map((asset) => (
            <div key={asset}>
              <Label className="text-gray-700 dark:text-gray-300">{asset.charAt(0).toUpperCase() + asset.slice(1)}</Label>
              <Input
                type="number"
                value={assetAllocation[asset]}
                onChange={(e) => setAssetAllocation({ ...assetAllocation, [asset]: parseFloat(e.target.value) })}
                placeholder={`Enter ${asset} %`}
                min="0"
                max="100"
                className="border dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Holdings Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Holdings</h2>
        {holdings.map((holding, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Company Name</Label>
              <Input
                type="text"
                value={holding.companyName}
                onChange={(e) => handleHoldingsChange(index, "companyName", e.target.value)}
                placeholder="Enter company name"
                className="border dark:border-gray-600 rounded-lg px-4 py-2 mb-2 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Total Shares</Label>
              <Input
                type="number"
                value={holding.totalShares}
                onChange={(e) => handleHoldingsChange(index, "totalShares", parseInt(e.target.value))}
                placeholder="Enter total shares"
                className="border dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        ))}
        <Button onClick={addHolding} disabled={holdings.length >= 7} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-700 dark:text-gray-200">
          + Add Holding
        </Button>
      </div>

      <Button onClick={handleSubmit} className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg w-full dark:bg-green-700 dark:text-gray-200">
        Save Portfolio
      </Button>
    </div>
  );
};

export default SavePortfolio;
