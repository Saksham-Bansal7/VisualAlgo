// Function to extract clean mermaid code from AI response
export const extractMermaidCode = (rawResponse) => {
  if (!rawResponse) return "";

  // Remove any text before the mermaid code
  let cleaned = rawResponse.trim();

  // Look for code blocks with ``` and extract content
  const codeBlockRegex = /```(?:mermaid)?\s*([\s\S]*?)\s*```/i;
  const codeBlockMatch = cleaned.match(codeBlockRegex);

  if (codeBlockMatch) {
    cleaned = codeBlockMatch[1].trim();
  }

  // Find the start of the actual mermaid diagram (usually starts with flowchart, graph, etc.)
  const mermaidStartRegex =
    /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gitgraph|pie|journey|gantt|mindmap|timeline|quadrantChart|requirement|c4Context|c4Container|c4Component|c4Dynamic|sankey|xyChart|block)/im;
  const lines = cleaned.split("\n");

  let startIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (mermaidStartRegex.test(lines[i].trim())) {
      startIndex = i;
      break;
    }
  }

  if (startIndex !== -1) {
    // Take from the mermaid start to the end, but remove any trailing explanation text
    let mermaidLines = lines.slice(startIndex);

    // Remove any lines that look like explanatory text after the diagram
    let endIndex = mermaidLines.length;
    for (let i = 1; i < mermaidLines.length; i++) {
      const line = mermaidLines[i].trim();
      // If we find a line that looks like explanation text, cut it off
      if (
        line.toLowerCase().includes("let me know") ||
        line.toLowerCase().includes("this is") ||
        line.toLowerCase().includes("explanation") ||
        line.toLowerCase().includes("note:") ||
        line.match(/^[A-Z][a-z].*[.!?]$/)
      ) {
        endIndex = i;
        break;
      }
    }

    cleaned = mermaidLines.slice(0, endIndex).join("\n").trim();
  }

  // Remove any remaining explanatory text patterns
  cleaned = cleaned
    .replace(/^.*?Here is.*?:?\s*/i, "") // Remove "Here is the mermaid code" type lines
    .replace(/^.*?flowchart.*?:?\s*/i, "flowchart ") // Clean up flowchart declaration
    .replace(/Let me know.*$/i, "") // Remove "Let me know" endings
    .replace(/```.*$/gm, "") // Remove any remaining code block markers
    .trim();

  return cleaned;
};
