const mongoose = require("mongoose");

const PortfolioSummarySchema = new mongoose.Schema({
  month: { type: String, required: true }, // e.g., "Jan 2024"
  totalValue: { type: Number, required: true },
});

const AssetAllocationSchema = new mongoose.Schema({
  stocks: { type: Number, required: true, min: 0, max: 100 }, // in percentage
  bonds: { type: Number, required: true, min: 0, max: 100 },
  cash: { type: Number, required: true, min: 0, max: 100 },
  realEstate: { type: Number, required: true, min: 0, max: 100 },
});

const HoldingsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  totalShares: { type: Number, required: true, min: 0 },
});

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  portfolioSummary: {
    type: [PortfolioSummarySchema],
    required: true,
    validate: [arrayLimit, "{PATH} exceeds the limit of 6"],
  },
  assetAllocation: { type: AssetAllocationSchema, required: true },
  holdings: {
    type: [HoldingsSchema],
    required: true,
    validate: [arrayLimitHoldings, "{PATH} exceeds the limit of 7"],
  },
});

function arrayLimit(val) {
  return val.length <= 6;
}

function arrayLimitHoldings(val) {
  return val.length <= 7;
}

module.exports = mongoose.model("Portfolio", PortfolioSchema);
