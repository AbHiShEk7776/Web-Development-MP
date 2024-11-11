import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const StockPrediction = ({ predictions }) => {
  // Function to get the stock action based on initial and final recommendations
  const getStockAction = (initialRecommendation, finalRecommendation) => {
    if (initialRecommendation === "Hold" || finalRecommendation === "Hold") {
        return "Hold";
      } else if (initialRecommendation === "Sell" && finalRecommendation === "Sell") {
        return "Sell";
      } else if (
        (initialRecommendation === "Sell" && finalRecommendation === "Buy") ||
        (initialRecommendation === "Buy" && finalRecommendation === "Sell")
      ) {
        return "Hold";
      } else if (initialRecommendation === "Buy" && finalRecommendation === "Buy") {
        return "Buy";
      }
      return "Unknown"; // Fallback if needed
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Stock Prediction
      </h1>

      {/* Display the stock actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(predictions["Initial Recommendations"]).map(([symbol, initialRecommendation]) => {
          // Get the corresponding final recommendation
          const finalRecommendation = predictions["Final Adjusted Recommendations"][symbol];

          // Get the stock action based on both initial and final recommendations
          const stockAction = getStockAction(initialRecommendation, finalRecommendation);

          return (
            <Card
              key={symbol}
              className="p-4 bg-white dark:bg-gray-800 shadow rounded"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {symbol}
              </h2>
              <p
                className={`text-lg font-bold ${
                  stockAction === "Sell"
                    ? "text-red-500"
                    : stockAction === "Hold"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Reco: {stockAction}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Dialog to show more details about the recommendations */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-8">View Details</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recommendation Details</DialogTitle>
          </DialogHeader>
          <div>
            {/* Loop through all recommendations to show details */}
            {Object.entries(predictions).map(([type, recs]) => (
              <div key={type} className="mb-4">
                <h3 className="text-xl font-semibold">{type}</h3>
                <ul>
                  {Object.entries(recs).map(([symbol, recommendation]) => (
                    <li key={symbol} className="py-1">
                      <strong className="text-gray-800 dark:text-gray-200">
                        {symbol}:
                      </strong>
                      <span className="font-bold text-gray-800 dark:text-gray-200">
                        {recommendation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StockPrediction;
