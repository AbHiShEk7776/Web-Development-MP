import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PortfolioManagement = () => {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    portfolioSummary: [],
    assetAllocation: { stocks: 0, bonds: 0, cash: 0, realEstate: 0 },
    holdings: [],
  });
  const [selectedAsset, setSelectedAsset] = useState("");
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/portfolio", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    fetchPortfolio();
  }, []);

  const handleUpdatePortfolio = () => {
    navigate("/update-portfolio");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-200 mb-12">
        Portfolio Management
      </h1>

      {/* Portfolio Summary (last 6 months) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Portfolio Performance (Last 6 Months)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {portfolio.portfolioSummary.map((summary) => (
            <div key={summary.month} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
              <span className="text-lg font-medium">{summary.month}</span>
              <span className="text-xl font-bold text-green-500 dark:text-green-400">
                ₹{summary.totalValue.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Allocation Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Asset Allocation
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Stocks", value: portfolio.assetAllocation.stocks },
                  { name: "Bonds", value: portfolio.assetAllocation.bonds },
                  { name: "Cash", value: portfolio.assetAllocation.cash },
                  { name: "Real Estate", value: portfolio.assetAllocation.realEstate },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Holdings List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Holdings (Top 7)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-800 dark:text-gray-200">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-right">Shares</th>
                  {/* <th className="p-3 text-right">Status</th> */}
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding) => (
                  <tr key={holding.companyName} className="border-b dark:border-gray-600">
                    <td className="p-3">{holding.companyName}</td>
                    <td className="p-3 text-right">{holding.totalShares}</td>
                    {/* <td className="p-3 text-right">
                      {holding.status === "Holding" ? (
                        <TrendingUp className="inline h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="inline h-5 w-5 text-red-500" />
                      )}
                      <span className="ml-2">{holding.status}</span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Buy/Sell Assets Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="block mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md mb-6">
            Buy/Sell Assets
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy/Sell Transaction</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <Select onValueChange={setSelectedAsset}>
              <SelectTrigger className="mb-3">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent>
                {portfolio.holdings.map((holding) => (
                  <SelectItem key={holding.companyName} value={holding.companyName}>
                    {holding.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Amount" className="w-full mb-3" />
            <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold">
              Confirm Transaction
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Portfolio Button */}
      <div className="text-center mt-8">
        <Button onClick={handleUpdatePortfolio} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-md shadow-md">
          Update Portfolio
        </Button>
      </div>
    </div>
  );
};

export default PortfolioManagement;
