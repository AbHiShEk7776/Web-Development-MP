const Portfolio = require('../models/Portfolio'); // Adjust the import according to your project structure

// Controller to get a user's portfolio
const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in the token
    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to save a new user's portfolio
const savePortfolio = async (req, res) => {
  try {
    const userId = req.user.id;
    const newPortfolio = new Portfolio({
      userId,
      portfolioSummary: req.body.portfolioSummary,  // Array of { month, totalValue }
      assetAllocation: req.body.assetAllocation,    // { stocks, bonds, cash, realEstate }
      holdings: req.body.holdings                   // Array of { companyName, totalShares, status }
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error("Error saving portfolio:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to update a user's portfolio
const updatePortfolio = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId },
      {
        portfolioSummary: req.body.portfolioSummary, // Array of { month, totalValue }
        assetAllocation: req.body.assetAllocation,   // { stocks, bonds, cash, realEstate }
        holdings: req.body.holdings                  // Array of { companyName, totalShares, status }
      },
      { new: true } // Return the updated document
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(updatedPortfolio);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getPortfolio,
  savePortfolio,
  updatePortfolio,
};
