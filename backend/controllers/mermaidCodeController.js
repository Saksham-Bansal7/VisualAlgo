import Groq from "groq-sdk";
import { getMermaidPromptExamples } from "../utils/mermaidPromptExamples.js";

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const mermaidCode = async (sourceCode, language) => {
  try {
    const promptExamples = getMermaidPromptExamples(language);
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${promptExamples} - to Generate a mermaid diagram code from the below ${language} source code - ${sourceCode}

Return only mermaid js code in flowchart form only, follow all the syntax of mermaidjs flowchart strictly}`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      stream: false,
    });

    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error generating mermaid code:", error);
    throw new Error("Failed to generate mermaid code. Please try again.");
  }
};
export { mermaidCode };
