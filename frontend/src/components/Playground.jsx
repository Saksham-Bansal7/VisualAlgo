import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { Save, Play, Settings, FileText } from "lucide-react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const languageExtensions = {
  javascript,
  python,
  java,
  cpp,
};

const defaultCode = {
  javascript: '// JavaScript Code\nconsole.log("Hello, World!");',
  python: '# Python Code\nprint("Hello, World!")',
  java: '// Java Code\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  cpp: '// C++ Code\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
};

// Helper function to get initial values
const getInitialValues = () => {
  // First check sessionStorage for example data
  const exampleCode = sessionStorage.getItem("exampleCode");
  const exampleLanguage = sessionStorage.getItem("exampleLanguage");
  const exampleTitle = sessionStorage.getItem("exampleTitle");

  if (exampleCode && exampleLanguage) {
    return {
      code: exampleCode,
      language: exampleLanguage,
      title: exampleTitle || "",
      fromSession: true,
    };
  }

  return {
    code: defaultCode.javascript,
    language: "javascript",
    title: "",
    fromSession: false,
  };
};

export default function Playground({
  initialCode,
  initialLanguage,
  initialTitle,
  flowchartId,
}) {
  const initialValues = getInitialValues();

  const [code, setCode] = useState(initialCode || initialValues.code);
  const [language, setLanguage] = useState(
    initialLanguage || initialValues.language
  );
  const [title, setTitle] = useState(initialTitle || initialValues.title);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [hasLoadedFromSession, setHasLoadedFromSession] = useState(
    initialValues.fromSession
  );
  const { user } = useAuth();

  // Clear sessionStorage on component mount if it was used for initialization
  useEffect(() => {
    const exampleCode = sessionStorage.getItem("exampleCode");
    const exampleLanguage = sessionStorage.getItem("exampleLanguage");
    const exampleTitle = sessionStorage.getItem("exampleTitle");

    console.log("Playground checking sessionStorage:", {
      exampleCode: exampleCode ? "Found" : "Not found",
      exampleLanguage: exampleLanguage ? "Found" : "Not found",
      exampleTitle: exampleTitle ? "Found" : "Not found",
    });

    console.log("Current state:", {
      code: code.substring(0, 50) + "...",
      language,
      title,
    });

    // Clear sessionStorage data after component mount
    if (exampleCode || exampleLanguage || exampleTitle) {
      sessionStorage.removeItem("exampleCode");
      sessionStorage.removeItem("exampleLanguage");
      sessionStorage.removeItem("exampleTitle");
    }
  }, []);

  // Update code when language changes and no initial code is provided
  useEffect(() => {
    if (!initialCode && !hasLoadedFromSession && defaultCode[language]) {
      setCode(defaultCode[language]);
    }
  }, [language, initialCode, hasLoadedFromSession]);

  const handleSaveCode = async () => {
    if (!user) {
      setSaveMessage("Please login to save code");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    try {
      const data = {
        title: title || `${language} Code`,
        code,
        language,
      };

      let response;
      if (flowchartId) {
        // Update existing flowchart
        response = await axiosInstance.put(
          API_PATHS.FLOWCHARTS.UPDATE(flowchartId),
          data
        );
      } else {
        // Create new flowchart
        response = await axiosInstance.post(API_PATHS.FLOWCHARTS.CREATE, data);
      }

      if (response.data.success) {
        setSaveMessage("Code saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error saving code:", error);
      setSaveMessage(error.response?.data?.error || "Failed to save code");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <FileText className="text-purple-600" size={24} />
              <h1 className="text-2xl font-bold text-gray-800">
                Code Playground
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>

              <button
                onClick={handleSaveCode}
                disabled={isSaving}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                <span>{isSaving ? "Saving..." : "Save Code"}</span>
              </button>
            </div>
          </div>

          {saveMessage && (
            <div
              className={`mt-4 p-3 rounded-md ${saveMessage.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {saveMessage}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Code Editor */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm font-medium">
                  {language.charAt(0).toUpperCase() + language.slice(1)} Editor
                </span>
              </div>
              <Settings size={16} className="text-gray-400" />
            </div>

            <CodeMirror
              value={code}
              height="500px"
              extensions={[languageExtensions[language]()]}
              onChange={(value) => setCode(value)}
              theme="dark"
              className="text-sm"
            />
          </div>

          {/* Mermaid Diagram Placeholder */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium">Mermaid Diagram</span>
              <Play size={16} />
            </div>
            <div className="p-8 h-[500px] flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Diagram Visualization
                </h3>
                <p className="text-sm">Mermaid diagram will appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Explanation Placeholder */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="bg-green-600 text-white px-4 py-3 flex items-center">
            <span className="text-sm font-medium">Algorithm Explanation</span>
          </div>
          <div className="p-8 h-64 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Algorithm Analysis</h3>
              <p className="text-sm">Algorithm explanation will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
