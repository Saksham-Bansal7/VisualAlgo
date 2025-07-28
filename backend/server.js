import express from "express";
import cors from "cors";
import helmet from "helmet";
import { protect } from "./middleware/authMiddleware.js";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import flowchartRoutes from "./routes/sourceCodeRoutes.js";
import { mermaidCode } from "./controllers/mermaidCodeController.js";
import { getAlgorithmExplanation } from "./controllers/algorithmController.js";

const app = express();
const PORT = process.env.PORT;

//connect to MongoDB
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

//main routes
app.use("/api/auth", userRoutes);
app.use("/api/flowcharts", flowchartRoutes);

// Mermaid code generation route
app.post("/api/mermaidCode", protect, async (req, res) => {
  try {
    const { sourceCode, language } = req.body;
    if (!sourceCode || !language) {
      return res.status(400).json({
        success: false,
        error: "Source code and language are required",
      });
    }

    const mermaidDiagram = await mermaidCode(sourceCode, language);
    res.json({
      success: true,
      data: { mermaidCode: mermaidDiagram },
    });
  } catch (error) {
    console.error("Error generating mermaid code:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate mermaid diagram",
    });
  }
});

// Algorithm explanation route
app.post("/api/algorithmExplanation", protect, async (req, res) => {
  try {
    const { sourceCode, language } = req.body;
    if (!sourceCode || !language) {
      return res.status(400).json({
        success: false,
        error: "Source code and language are required",
      });
    }

    const explanation = await getAlgorithmExplanation(sourceCode, language);
    res.json({
      success: true,
      data: { explanation: explanation.choices[0]?.message?.content },
    });
  } catch (error) {
    console.error("Error generating algorithm explanation:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate algorithm explanation",
    });
  }
});

//welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the VisualAlgo Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
