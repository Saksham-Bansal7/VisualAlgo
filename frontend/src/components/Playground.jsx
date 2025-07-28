import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import {
  Save,
  Play,
  Settings,
  FileText,
  Zap,
  Brain,
  Loader2,
  Eye,
  Code,
} from "lucide-react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import MermaidDiagram from "./MermaidDiagram";
import { extractMermaidCode } from "../utils/mermaidUtils";

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

  // New state for mermaid and algorithm features
  const [mermaidCode, setMermaidCode] = useState("");
  const [isGeneratingMermaid, setIsGeneratingMermaid] = useState(false);
  const [mermaidError, setMermaidError] = useState("");
  const [showMermaidCode, setShowMermaidCode] = useState(false); // Toggle between diagram and code view

  const [algorithmExplanation, setAlgorithmExplanation] = useState("");
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState("");

  const { user } = useAuth();

  // Clear sessionStorage on component mount if it was used for initialization
  useEffect(() => {
    const exampleCode = sessionStorage.getItem("exampleCode");
    const exampleLanguage = sessionStorage.getItem("exampleLanguage");
    const exampleTitle = sessionStorage.getItem("exampleTitle");

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
    // Clear previous results when language changes
    setMermaidCode("");
    setAlgorithmExplanation("");
    setMermaidError("");
    setExplanationError("");
    setShowMermaidCode(false);
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

  const handleGenerateMermaid = async () => {
    if (!user) {
      setMermaidError("Please login to generate diagrams");
      return;
    }

    if (!code.trim()) {
      setMermaidError("Please enter some code first");
      return;
    }

    setIsGeneratingMermaid(true);
    setMermaidError("");
    setShowMermaidCode(false); // Always show diagram view first

    try {
      const response = await axiosInstance.post(API_PATHS.MERMAID_CODE, {
        sourceCode: code,
        language: language,
      });

      if (response.data.success) {
        const rawMermaidCode = response.data.data.mermaidCode;
        const cleanedMermaidCode = extractMermaidCode(rawMermaidCode);

        if (!cleanedMermaidCode) {
          setMermaidError("Could not extract valid mermaid code from response");
          return;
        }

        setMermaidCode(cleanedMermaidCode);
      } else {
        setMermaidError(
          response.data.error || "Failed to generate mermaid diagram"
        );
      }
    } catch (error) {
      console.error("Error generating mermaid code:", error);
      setMermaidError(
        error.response?.data?.error || "Failed to generate mermaid diagram"
      );
    } finally {
      setIsGeneratingMermaid(false);
    }
  };

  const handleGenerateExplanation = async () => {
    if (!user) {
      setExplanationError("Please login to generate explanations");
      return;
    }

    if (!code.trim()) {
      setExplanationError("Please enter some code first");
      return;
    }

    setIsGeneratingExplanation(true);
    setExplanationError("");

    try {
      const response = await axiosInstance.post(
        API_PATHS.ALGORITHM_EXPLANATION,
        {
          sourceCode: code,
          language: language,
        }
      );

      if (response.data.success) {
        setAlgorithmExplanation(response.data.data.explanation);
      } else {
        setExplanationError(
          response.data.error || "Failed to generate algorithm explanation"
        );
      }
    } catch (error) {
      console.error("Error generating algorithm explanation:", error);
      setExplanationError(
        error.response?.data?.error ||
          "Failed to generate algorithm explanation"
      );
    } finally {
      setIsGeneratingExplanation(false);
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

              <button
                onClick={handleGenerateMermaid}
                disabled={isGeneratingMermaid || !code.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingMermaid ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Zap size={16} />
                )}
                <span>
                  {isGeneratingMermaid ? "Generating..." : "Generate Diagram"}
                </span>
              </button>

              <button
                onClick={handleGenerateExplanation}
                disabled={isGeneratingExplanation || !code.trim()}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingExplanation ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Brain size={16} />
                )}
                <span>
                  {isGeneratingExplanation
                    ? "Analyzing..."
                    : "Explain Algorithm"}
                </span>
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

          {/* Mermaid Diagram */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium">Mermaid Diagram</span>
              <div className="flex items-center space-x-2">
                {mermaidCode && (
                  <button
                    onClick={() => setShowMermaidCode(!showMermaidCode)}
                    className="p-1 hover:bg-blue-700 rounded transition-colors"
                    title={showMermaidCode ? "Show Diagram" : "Show Code"}
                  >
                    {showMermaidCode ? <Eye size={16} /> : <Code size={16} />}
                  </button>
                )}
                <Play size={16} />
              </div>
            </div>
            <div className="h-[500px] overflow-hidden">
              {mermaidError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4 mt-4">
                  {mermaidError}
                </div>
              )}
              {mermaidCode ? (
                <div className="h-full">
                  {showMermaidCode ? (
                    // Show raw mermaid code
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto h-full m-4">
                      <pre className="whitespace-pre-wrap">{mermaidCode}</pre>
                    </div>
                  ) : (
                    // Show rendered mermaid diagram
                    <div className="h-full">
                      <MermaidDiagram
                        chart={mermaidCode}
                        id={`diagram-${Date.now()}`}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <MermaidDiagram chart="" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Algorithm Explanation */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="bg-green-600 text-white px-4 py-3 flex items-center">
            <Brain className="mr-2" size={18} />
            <span className="text-sm font-medium">Algorithm Explanation</span>
          </div>
          <div className="p-6 min-h-64 max-h-96 overflow-auto">
            {explanationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {explanationError}
              </div>
            )}
            {algorithmExplanation ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed"
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.7",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      }}
                    >
                      {algorithmExplanation
                        .split("\n")
                        .map((paragraph, index) => {
                          if (paragraph.trim() === "") return null;

                          // Check if it's a heading (contains ** or starts with certain patterns)
                          if (
                            paragraph.includes("**") ||
                            paragraph.match(
                              /^(Functionality|Time Complexity|Space Complexity|Algorithm|Implementation|Summary):/i
                            )
                          ) {
                            return (
                              <div key={index} className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  {paragraph.replace(/\*\*/g, "").trim()}
                                </h3>
                              </div>
                            );
                          }

                          // Regular paragraph
                          return (
                            <p key={index} className="mb-3 text-gray-700 pl-5">
                              {paragraph.trim()}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Analysis badges */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    📊 Complexity Analysis
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    🔍 Code Review
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    ⚡ Performance Insights
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Brain className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Algorithm Analysis
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    Click "Explain Algorithm" to get detailed analysis with
                    complexity information, performance insights, and
                    implementation details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
