import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar isLandingPage={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to VisualAlgo Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start creating beautiful flowcharts from your code
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Code Editor</h2>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-md font-mono text-sm"
              placeholder="Paste your code here..."
            />
            <div className="mt-4 flex justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                Generate Flowchart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
