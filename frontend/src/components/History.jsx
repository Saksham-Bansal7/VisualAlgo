import React, { useState, useEffect } from "react";
import { Clock, Code, Trash2, Edit, Eye, FileText, Search } from "lucide-react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [flowcharts, setFlowcharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchFlowcharts();
    }
  }, [user]);

  const fetchFlowcharts = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.FLOWCHARTS.GET_ALL);
      if (response.data.success) {
        setFlowcharts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching flowcharts:", error);
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFlowchart = async (id) => {
    if (!confirm("Are you sure you want to delete this code?")) return;

    try {
      const response = await axiosInstance.delete(
        API_PATHS.FLOWCHARTS.DELETE(id)
      );
      if (response.data.success) {
        setFlowcharts(flowcharts.filter((fc) => fc._id !== id));
      }
    } catch (error) {
      console.error("Error deleting flowchart:", error);
      setError("Failed to delete code");
    }
  };

  const handleEditFlowchart = (flowchart) => {
    // Navigate to playground with the selected code
    navigate("/playground", {
      state: {
        code: flowchart.code,
        language: flowchart.language,
        title: flowchart.title,
        flowchartId: flowchart._id,
      },
    });
  };

  const filteredFlowcharts = flowcharts.filter(
    (fc) =>
      fc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fc.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLanguageColor = (language) => {
    const colors = {
      javascript: "bg-yellow-100 text-yellow-800",
      python: "bg-blue-100 text-blue-800",
      java: "bg-red-100 text-red-800",
      cpp: "bg-purple-100 text-purple-800",
    };
    return colors[language] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Please Login
          </h2>
          <p className="text-gray-500">
            You need to be logged in to view your code history.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your code history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Clock className="text-purple-600" size={24} />
              <h1 className="text-2xl font-bold text-gray-800">Code History</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search by title or language..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={() => navigate("/playground")}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Code size={16} />
                <span>New Code</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Code History Grid */}
        {filteredFlowcharts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {searchTerm ? "No matching code found" : "No code history yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start coding to see your history here"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate("/playground")}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Create Your First Code
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlowcharts.map((flowchart) => (
              <div
                key={flowchart._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 truncate mb-2">
                        {flowchart.title}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(flowchart.language)}`}
                      >
                        {flowchart.language.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="bg-gray-900 rounded-md p-3 mb-4">
                    <pre className="text-green-400 text-xs overflow-hidden">
                      <code>{flowchart.code.substring(0, 150)}...</code>
                    </pre>
                  </div>

                  {/* Metadata */}
                  <div className="text-sm text-gray-500 mb-4">
                    <p className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {formatDate(flowchart.createdAt)}
                    </p>
                    {flowchart.updatedAt !== flowchart.createdAt && (
                      <p className="flex items-center mt-1">
                        <Edit size={14} className="mr-1" />
                        Updated {formatDate(flowchart.updatedAt)}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditFlowchart(flowchart)}
                      className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm flex items-center justify-center"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFlowchart(flowchart._id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
