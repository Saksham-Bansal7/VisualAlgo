import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Code, Clock, Play, FileText, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar isLandingPage={false} />

      <div className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Welcome Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                Ready to visualize your algorithms? Choose where you'd like to
                start.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Playground Card */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Code className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Code Playground
                    </h3>
                    <p className="text-gray-600">
                      Write and visualize your algorithms
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Start coding in your favorite language and see your algorithms
                  come to life with interactive flowcharts and detailed
                  explanations.
                </p>

                <a
                  href="/playground"
                  className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Play className="mr-2" size={16} />
                  Start Coding
                  <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
            </div>

            {/* History Card */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Code History
                    </h3>
                    <p className="text-gray-600">
                      View and manage your saved code
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Access all your previously saved algorithms, continue working
                  on projects, or review your coding journey.
                </p>

                <a
                  href="/history"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Clock className="mr-2" size={16} />
                  View History
                  <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What You Can Do
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-green-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Multi-Language Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Write code in JavaScript, Python, Java, and C++ with syntax
                  highlighting
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="text-yellow-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Visual Flowcharts
                </h3>
                <p className="text-gray-600 text-sm">
                  Automatically generate Mermaid diagrams from your code
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-red-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Algorithm Analysis
                </h3>
                <p className="text-gray-600 text-sm">
                  Get detailed explanations and complexity analysis of your
                  algorithms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
