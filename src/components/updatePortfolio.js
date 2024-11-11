import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";

const UpdatePortfolio = () => {
  const [portfolio, setPortfolio] = useState({
    portfolioSummary: [{ month: "", totalValue: 0 }],
    assetAllocation: { stocks: 0, bonds: 0, cash: 0, realEstate: 0 },
    holdings: [{ companyName: "", totalShares: 0, status: "Holding" }],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/portfolio",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    fetchPortfolio();
  }, []);

  const handlePortfolioSummaryChange = (index, field, value) => {
    const updatedPortfolio = { ...portfolio };
    updatedPortfolio.portfolioSummary[index][field] = value;
    setPortfolio(updatedPortfolio);
  };

  const addPortfolioSummary = () => {
    if (portfolio.portfolioSummary.length < 6) {
      setPortfolio((prev) => ({
        ...prev,
        portfolioSummary: [
          ...prev.portfolioSummary,
          { month: "", totalValue: 0 },
        ],
      }));
    }
  };

  const handleAssetAllocationChange = (field, value) => {
    const updatedPortfolio = { ...portfolio };
    updatedPortfolio.assetAllocation[field] = value;
    setPortfolio(updatedPortfolio);
  };

  const handleAddHolding = () => {
    if (portfolio.holdings.length < 7) {
      setPortfolio((prev) => ({
        ...prev,
        holdings: [
          ...prev.holdings,
          { companyName: "", totalShares: 0, status: "Holding" },
        ],
      }));
    }
  };

  const handleHoldingChange = (index, field, value) => {
    const updatedPortfolio = { ...portfolio };
    updatedPortfolio.holdings[index][field] = value;
    setPortfolio(updatedPortfolio);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/portfolio/update", portfolio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating portfolio:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Update Portfolio
      </h1>

      {/* Portfolio Summary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Portfolio Summary
        </h2>
        {portfolio.portfolioSummary.map((summary, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                type="text"
                placeholder="Month"
                value={summary.month}
                onChange={(e) =>
                  handlePortfolioSummaryChange(index, "month", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Total Value"
                value={summary.totalValue}
                onChange={(e) =>
                  handlePortfolioSummaryChange(
                    index,
                    "totalValue",
                    Number(e.target.value)
                  )
                }
                className="input-field"
              />
            </div>
          </div>
        ))}
        <Button onClick={addPortfolioSummary} className="btn mt-4">
          Add Portfolio Summary
        </Button>
      </div>

      {/* Asset Allocation */}
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Asset Allocation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="stocks"
              className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Stocks (%)
            </label>
            <Input
              id="stocks"
              type="number"
              placeholder="Stocks (%)"
              value={portfolio.assetAllocation.stocks}
              onChange={(e) =>
                handleAssetAllocationChange("stocks", Number(e.target.value))
              }
              className="input-field"
              min={0}
              max={100}
            />
          </div>

          <div>
            <label
              htmlFor="bonds"
              className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Bonds (%)
            </label>
            <Input
              id="bonds"
              type="number"
              placeholder="Bonds (%)"
              value={portfolio.assetAllocation.bonds}
              onChange={(e) =>
                handleAssetAllocationChange("bonds", Number(e.target.value))
              }
              className="input-field"
              min={0}
              max={100}
            />
          </div>

          <div>
            <label
              htmlFor="cash"
              className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Cash (%)
            </label>
            <Input
              id="cash"
              type="number"
              placeholder="Cash (%)"
              value={portfolio.assetAllocation.cash}
              onChange={(e) =>
                handleAssetAllocationChange("cash", Number(e.target.value))
              }
              className="input-field"
              min={0}
              max={100}
            />
          </div>

          <div>
            <label
              htmlFor="realEstate"
              className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Real Estate (%)
            </label>
            <Input
              id="realEstate"
              type="number"
              placeholder="Real Estate (%)"
              value={portfolio.assetAllocation.realEstate}
              onChange={(e) =>
                handleAssetAllocationChange(
                  "realEstate",
                  Number(e.target.value)
                )
              }
              className="input-field"
              min={0}
              max={100}
            />
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Holdings
        </h2>
        {portfolio.holdings.map((holding, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                type="text"
                placeholder="Company Name"
                value={holding.companyName}
                onChange={(e) =>
                  handleHoldingChange(index, "companyName", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Total Shares"
                value={holding.totalShares}
                onChange={(e) =>
                  handleHoldingChange(
                    index,
                    "totalShares",
                    Number(e.target.value)
                  )
                }
                className="input-field"
                min={0}
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAddHolding} className="btn mt-4">
          Add Holding
        </Button>
      </div>

      <div className="text-center mt-8">
        <Button onClick={handleSubmit} className="btn w-full">
          Save Portfolio
        </Button>
      </div>
    </div>
  );
};

export default UpdatePortfolio;
