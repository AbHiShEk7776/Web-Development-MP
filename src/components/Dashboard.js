// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { DollarSign, TrendingUp, AlertCircle, Activity, IndianRupee } from 'lucide-react';
// const API_KEY = '971e4059f65f47b1a38a191e3c1d21ff';
// const Dashboard = () => {
//   const [portfolioValue, setPortfolioValue] = useState(0);
//   const [performanceData, setPerformanceData] = useState([]);
//   const [newsItems, setNewsItems] = useState([]);

//   useEffect(() => {
//     // Simulating API call to fetch portfolio data
//     setTimeout(() => {
//       setPortfolioValue(150000);
//       setPerformanceData([
//         { date: 'Jan', value: 100000 },
//         { date: 'Feb', value: 120000 },
//         { date: 'Mar', value: 110000 },
//         { date: 'Apr', value: 130000 },
//         { date: 'May', value: 140000 },
//         { date: 'Jun', value: 150000 },
//       ]);
//     }, 1000);
//     const fetchNews = async () => {
//       try {
//         const response = await fetch(`https://newsapi.org/v2/everything?q=India&apiKey=${API_KEY}`);
//         const data = await response.json();
//         setNewsItems(data.articles.slice(0, 5)); // Get only the first 5 articles
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Investment Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <Card
//           title="Portfolio Value"
//           value={`${portfolioValue.toLocaleString()}`}
//           icon={<IndianRupee className="h-8 w-8 text-green-500" />}
//         />
//         <Card
//           title="Performance"
//           value="+15.5%"
//           icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
//         />
//         <Card
//           title="Risk Level"
//           value="Moderate"
//           icon={<AlertCircle className="h-8 w-8 text-yellow-500" />}
//         />
//         <Card
//           title="Active Investments"
//           value="12"
//           icon={<Activity className="h-8 w-8 text-purple-500" />}
//         />
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Portfolio Performance</h2>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={performanceData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ccc" className="dark:stroke-gray-700" />
//               <XAxis dataKey="date" stroke="#333" className="dark:stroke-gray-400" />
//               <YAxis stroke="#333" className="dark:stroke-gray-400" />
//               <Tooltip />
//               <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Activities</h2>
//         <ul className="space-y-4">
//           <ActivityItem
//             title="Stock Purchase"
//             description="Bought 10 shares of Tata"
//             date="2 hours ago"
//           />
//           <ActivityItem
//             title="Dividend Received"
//             description="Rs150 dividend from Zomato"
//             date="1 day ago"
//           />
//           <ActivityItem
//             title="Portfolio Rebalanced"
//             description="Adjusted asset allocation"
//             date="3 days ago"
//           />
//         </ul>
//       </div> */}
//        <NewsTicker newsItems={newsItems} />
//     </div>
//   );
// };

// const Card = ({ title, value, icon }) => (
//   <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
//       {icon}
//     </div>
//     <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
//   </div>
// );

// // const ActivityItem = ({ title, description, date }) => (
// //   <li className="flex items-center">
// //     <div className="bg-blue-100 dark:bg-blue-500 rounded-full p-2 mr-4">
// //       <Activity className="h-5 w-5 text-blue-500 dark:text-white" />
// //     </div>
// //     <div>
// //       <p className="font-semibold text-gray-800 dark:text-gray-200">{title}</p>
// //       <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
// //       <p className="text-xs text-gray-400 dark:text-gray-500">{date}</p>
// //     </div>
// //   </li>
// // );
// const NewsTicker = ({ newsItems }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
//     <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Latest News</h2>
//     <div className="overflow-x-auto">
//       <ul className="flex space-x-4">
//         {newsItems.map((item, index) => (
//           <li key={index} className="flex-none min-w-[200px] p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
//             <h3 className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
//             <p className="text-xs text-gray-600 dark:text-gray-400">{new Date(item.publishedAt).toLocaleDateString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );

// export default Dashboard;
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  Activity,
  IndianRupee,
} from "lucide-react";
import axios from "axios";

const API_KEY = "971e4059f65f47b1a38a191e3c1d21ff";

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [performancePercent, setPerformancePercent] = useState(0);
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [activeInvestments, setActiveInvestments] = useState(0);
  const [newsItems, setNewsItems] = useState([]);
  const [riskTolerance, setRiskTolerance] = useState("Moderate"); // Assume this comes from the portfolio
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch portfolio data
        const { data: userPortfolio } = await axios.get(
          "http://localhost:5000/api/portfolio",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (
          !userPortfolio?.portfolioSummary ||
          userPortfolio.portfolioSummary.length < 6
        ) {
          console.error("Portfolio summary data is missing or incomplete.");
          return;
        }

        // Map month and totalValue for chart data
        const monthlyValues = userPortfolio.portfolioSummary.map((item) => ({
          month: item.month,
          totalValue: item.totalValue,
        }));

        // Set June portfolio value
        const juneData = userPortfolio.portfolioSummary.find(
          (item) => item.month === "Jun 2024"
        );
        if (juneData) setPortfolioValue(juneData.totalValue);

        // Calculate performance percentage
        const janValue = userPortfolio.portfolioSummary[0]?.totalValue || 0;
        const junValue = juneData ? juneData.totalValue : 0;
        const performance = ((junValue - janValue) / janValue) * 100;
        setPerformancePercent(performance);

        // Set risk level
        const stocksAllocation = userPortfolio.assetAllocation.stocks || 0;
        setRiskLevel(
          stocksAllocation > 70
            ? "High"
            : stocksAllocation > 40
            ? "Moderate"
            : "Low"
        );
        setRiskTolerance(userPortfolio.riskTolerance || "Moderate");
        // Update chart and active investments
        if (isRiskMismatch(userPortfolio.riskTolerance, stocksAllocation)) {
          setShowAlert(true); // Show alert if there is a mismatch
        }
        setPerformanceData(monthlyValues);
        setActiveInvestments(userPortfolio.holdings?.length || 0);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolioData();

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=India&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setNewsItems(data.articles.slice(0, 5));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);
  const isRiskMismatch = (riskTolerance, stocksAllocation) => {
    if (riskTolerance === "conservative" && stocksAllocation > 40) {
      return true;
    }
    if (
      riskTolerance === "moderate" &&
      (stocksAllocation <= 40 || stocksAllocation > 70)
    ) {
      return true;
    }
    if (riskTolerance === "aggressive" && stocksAllocation <= 70) {
      return true;
    }
    return false;
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Investment Dashboard
      </h1>

      {showAlert && (
        <div className="bg-yellow-500 text-white p-4 rounded-lg mb-6">
          <p>
            <strong>Alert:</strong> Your portfolio's risk level does not match
            your risk tolerance.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Portfolio Value"
          value={`₹${portfolioValue.toLocaleString()}`}
          icon={<IndianRupee className="h-8 w-8 text-green-500" />}
        />
        <Card
          title="Performance"
          value={`${performancePercent.toFixed(2)}%`}
          icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
        />
        <Card
          title="Risk Level"
          value={riskLevel}
          icon={<AlertCircle className="h-8 w-8 text-yellow-500" />}
        />
        <Card
          title="Active Investments"
          value={activeInvestments}
          icon={<Activity className="h-8 w-8 text-purple-500" />}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Portfolio Performance
        </h2>
        <div className="h-80">
          {performanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ccc"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="month"
                  stroke="#333"
                  className="dark:stroke-gray-400"
                />
                <YAxis stroke="#333" className="dark:stroke-gray-400" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalValue"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>

      <NewsTicker newsItems={newsItems} />
    </div>
  );
};

const Card = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
      {value}
    </p>
  </div>
);

const NewsTicker = ({ newsItems }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
      Latest News
    </h2>
    <div className="overflow-x-auto">
      <ul className="flex space-x-4">
        {newsItems.map((item, index) => (
          <li
            key={index}
            className="flex-none min-w-[200px] p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow"
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {new Date(item.publishedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Dashboard;
