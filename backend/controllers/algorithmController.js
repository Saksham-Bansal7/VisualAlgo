import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});


const getAlgorithmExplanation = async (sourceCode, language) => {// Generate an explanation for the given source code & gives time space complexity
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate a detailed explanation of the following ${language} source code, including its functionality, time complexity, and space complexity.
          ${sourceCode}
          `
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      stream: false,
    });
    return response;
  } catch (error) {
    console.error("Error generating algorithm explanation:", error);
    throw error;
  }
};

export { getAlgorithmExplanation };
