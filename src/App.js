import React, { useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useTheme } from "./components/theme-provider";
import {
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  Settings as SettingsIcon,
  User,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Sun, Moon } from "lucide-react";

// Import your components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PortfolioManagement from "./components/PortfolioManagement";
import Settings from "./components/Settings";
import Help from "./components/Help";
import MarketDropdownMenu from "./components/MarketDropdownMenu";
import LogoutButton from "./components/LogoutButton";
import PortfolioQuestions from "./components/PortfolioQuestions";
import UpdatePortfolio from "./components/updatePortfolio";
import NewsPage from "./components/NewsPage";
import MarketScenario from "./components/MarketScenario";
import VerifyOtp from "./components/verifyOtp";
import StockPrediction from "./components/Recos";
import ParentComponent from "./components/RecosParent";
import SavePortfolio from "./components/savePortfolio";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toggleTheme, theme } = useTheme();
  useEffect(() => {
    console.log(
      "Initial isAuthenticated state from localStorage:",
      isAuthenticated
    );
  }, []);
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (userData) => {
    console.log("Logging in:", userData);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    setUser(userData);
  };
  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };
  const handleRegister = (userData) => {
    console.log("Registering:", userData);
    setIsAuthenticated(true); // Set the user as authenticated after registration
    localStorage.setItem("isAuthenticated", "true");
    setUser(userData);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setUser(null);
  };

  return (
    // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Router>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center gap-x-4">
            <div className="mr-4 hidden md:flex">
              <Link to="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block">
                  InvestAdvisor
                </span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                  to="/dashboard"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Dashboard
                </Link>
                <Link
                  to="/portfolio"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Portfolio
                </Link>
                <Link
                  to="/settings"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Settings
                </Link>
                <Link
                  to="/help"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Help
                </Link>
              </nav>
            </div>
            <MarketDropdownMenu />{" "}
            {/* Replaced DropdownMenu with MarketDropdownMenu */}
            {isAuthenticated &&
              Location.pathname !== "/login" &&
              Location.pathname !== "/register" && (
                <LogoutButton onLogout={handleLogout} />
              )}{" "}
            {/* Added LogoutButton here */}
            <Button
              onClick={handleToggleTheme}
              className="ml-auto bg-gray-300 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-400 transition duration-150 flex items-center"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 mr-2 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 mr-2 text-blue-500" />
              )}
            </Button>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/verify-otp"
              element={<VerifyOtp onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/portfolio"
              element={
                isAuthenticated ? (
                  <PortfolioManagement />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/portfolio-questions"
              element={
                isAuthenticated ? (
                  <PortfolioQuestions />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/savePortfolio"
              element={
                isAuthenticated ? (
                  <SavePortfolio />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/update-portfolio"
              element={
                isAuthenticated ? (
                  <UpdatePortfolio />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/news"
              element={
                isAuthenticated ? (
                  <NewsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/market-scenario"
              element={
                isAuthenticated ? (
                  <MarketScenario />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/recos" // This is where we render the ParentComponent which includes StockPrediction
              element={
                isAuthenticated ? (
                  <ParentComponent /> // Renders the ParentComponent (which in turn renders StockPrediction)
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/help" element={<Help />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>

        <footer className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by the CodePandas team. The source code is available on{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </Router>
    // </ThemeProvider>
  );
};

export default App;
