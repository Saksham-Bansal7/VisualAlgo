import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { protect } from './middleware/authMiddleware.js';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import flowchartRoutes from './routes/sourceCodeRoutes.js';
import { mermaidCode } from './controllers/mermaidCodeController.js';
import { getAlgorithmExplanation } from './controllers/algorithmController.js';


const app = express();
const PORT = process.env.PORT;



//connect to MongoDB
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

//main routes
app.use('/api/auth', userRoutes);
app.use('/api/flowcharts', flowchartRoutes);
app.post('/api/mermaidCode', protect, mermaidCode);
app.post('/api/algorithmExplanation', protect, getAlgorithmExplanation);

//welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the VisualAlgo Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});