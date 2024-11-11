// src/pages/PortfolioQuestions.js

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Select } from "../components/ui/select";
import { Dialog } from "../components/ui/dialog"; // Adjust import paths as necessary
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PortfolioQuestions = () => {
  const navigate = useNavigate();

  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [investmentStyle, setInvestmentStyle] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [investmentGoals, setInvestmentGoals] = useState("");
  const [marketKnowledge, setMarketKnowledge] = useState("");
  const [riskProfile, setRiskProfile] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/savePortfolio"); // Close the dialog
  };

  // Scoring function based on answers
  const classifyRiskProfile = (answers) => {
    const scoreMap = {
      years_of_experience: {
        "Less than 1 year": 1,
        "1-3 years": 2,
        "3+ years": 3,
      },
      investment_style: {
        "High-growth stocks": 3,
        "Stable, dividend-paying stocks": 1,
        "A mix of both": 2,
      },
      risk_tolerance: {
        "Low (I avoid risk)": 1,
        "Moderate (some risk for potential gains)": 2,
        "High (comfortable with market swings)": 3,
      },
      investment_goals: {
        "Short-term gains": 3,
        "Retirement or long-term wealth preservation": 1,
        "Balanced (some short-term and long-term)": 2,
      },
      market_knowledge: {
        Novice: 1,
        Intermediate: 2,
        Advanced: 3,
      },
    };

    let totalScore = 0;
    for (let question in answers) {
      const answer = answers[question];
      totalScore += scoreMap[question][answer] || 0;
    }

    if (totalScore <= 8) return "conservative";
    else if (totalScore >= 9 && totalScore <= 12) return "moderate";
    return "aggressive";
  };

  const handleSubmit = async () => {
    // Make handleSubmit async
    const answers = {
      years_of_experience: yearsOfExperience,
      investment_style: investmentStyle,
      risk_tolerance: riskTolerance,
      investment_goals: investmentGoals,
      market_knowledge: marketKnowledge,
    };
    const profile = classifyRiskProfile(answers);
    setRiskProfile(profile);
    setDialogOpen(true);

    try {
      const token = localStorage.getItem("token");
      console.log(token); // Assuming the JWT token is stored in local storage
      await fetch("http://localhost:5000/api/user/risk-tolerance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ riskTolerance: profile }),
      });
    } catch (error) {
      console.error("Failed to update risk tolerance:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Portfolio Questions
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">
          Years of Investment Experience
        </h2>
        <Select
          options={[
            { value: "Less than 1 year", label: "Less than 1 year" },
            { value: "1-3 years", label: "1-3 years" },
            { value: "3+ years", label: "3+ years" },
          ]}
          value={yearsOfExperience}
          onChange={setYearsOfExperience}
          placeholder="Select your experience"
        />

        <h2 className="text-xl font-semibold mb-4">Investment Style</h2>
        <Select
          options={[
            { value: "High-growth stocks", label: "High-growth stocks" },
            {
              value: "Stable, dividend-paying stocks",
              label: "Stable, dividend-paying stocks",
            },
            { value: "A mix of both", label: "A mix of both" },
          ]}
          value={investmentStyle}
          onChange={setInvestmentStyle}
          placeholder="Select your investment style"
        />

        <h2 className="text-xl font-semibold mb-4">Risk Tolerance</h2>
        <Select
          options={[
            { value: "Low (I avoid risk)", label: "Low (I avoid risk)" },
            {
              value: "Moderate (some risk for potential gains)",
              label: "Moderate (some risk for potential gains)",
            },
            {
              value: "High (comfortable with market swings)",
              label: "High (comfortable with market swings)",
            },
          ]}
          value={riskTolerance}
          onChange={setRiskTolerance}
          placeholder="Select your risk tolerance"
        />

        <h2 className="text-xl font-semibold mb-4">Investment Goals</h2>
        <Select
          options={[
            { value: "Short-term gains", label: "Short-term gains" },
            {
              value: "Retirement or long-term wealth preservation",
              label: "Retirement or long-term wealth preservation",
            },
            {
              value: "Balanced (some short-term and long-term)",
              label: "Balanced (some short-term and long-term)",
            },
          ]}
          value={investmentGoals}
          onChange={setInvestmentGoals}
          placeholder="Select your investment goals"
        />

        <h2 className="text-xl font-semibold mb-4">Market Knowledge</h2>
        <Select
          options={[
            { value: "Novice", label: "Novice" },
            { value: "Intermediate", label: "Intermediate" },
            { value: "Advanced", label: "Advanced" },
          ]}
          value={marketKnowledge}
          onChange={setMarketKnowledge}
          placeholder="Select your market knowledge"
        />
      </div>
      <div className="flex flex-row space-x-4">
        <Button onClick={handleSubmit} className="mt-4">
          Submit
        </Button>
        <Button onClick={() => navigate("/savePortfolio")} className="mt-4">
          Go to Save Portfolio
        </Button>
      </div>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div>
          Your risk profile is: <strong>{riskProfile}</strong>
        </div>
        <Button onClick={handleDialogClose}>
          Continue to Create Portfolio
        </Button>
      </Dialog>
    </div>
  );
};

export default PortfolioQuestions;
