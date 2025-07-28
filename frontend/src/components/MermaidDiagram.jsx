import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { extractMermaidCode } from "../utils/mermaidUtils";

const MermaidDiagram = ({ chart, id }) => {
  const ref = useRef(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize mermaid with configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
        padding: 20,
        nodeSpacing: 50,
        rankSpacing: 75,
      },
      themeVariables: {
        primaryColor: "#fff",
        primaryTextColor: "#333",
        primaryBorderColor: "#333",
        lineColor: "#333",
        fontFamily: "arial",
        fontSize: "14px",
      },
    });
  }, []);

  useEffect(() => {
    if (chart && ref.current) {
      const renderDiagram = async () => {
        try {
          setError("");
          setSvg("");

          // Clean the mermaid code from AI response
          const cleanedChart = extractMermaidCode(chart);

          if (!cleanedChart) {
            setError("No valid mermaid code found in response");
            return;
          }

          // Generate unique ID for the diagram
          const diagramId = `mermaid-${id || Date.now()}`;

          // Validate and render the mermaid diagram
          const { svg: svgContent } = await mermaid.render(
            diagramId,
            cleanedChart
          );
          setSvg(svgContent);
        } catch (err) {
          console.error("Mermaid rendering error:", err);
          setError("Invalid mermaid syntax or rendering error: " + err.message);
        }
      };

      renderDiagram();
    }
  }, [chart, id]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center text-red-600">
          <p className="font-medium">Diagram Rendering Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!chart) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Diagram Visualization</h3>
          <p className="text-sm">
            Click "Generate Diagram" to create a mermaid flowchart
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="h-full overflow-auto bg-white"
      style={{ minHeight: "100%" }}
    >
      <div
        className="w-full min-h-full flex justify-center py-4"
        style={{ minWidth: "fit-content" }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};

export default MermaidDiagram;
