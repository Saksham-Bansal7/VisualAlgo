import React from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Playground from "./components/Playground";
import History from "./components/History";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Wrapper components to include Navbar and Footer
const PlaygroundPage = () => {
  const location = useLocation();
  const state = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar isLandingPage={false} />
      <div className="flex-1">
        <Playground
          initialCode={state.code}
          initialLanguage={state.language}
          initialTitle={state.title}
          flowchartId={state.flowchartId}
        />
      </div>
      <Footer />
    </div>
  );
};

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar isLandingPage={false} />
      <div className="flex-1">
        <History />
      </div>
      <Footer />
    </div>
  );
};

export default App;
