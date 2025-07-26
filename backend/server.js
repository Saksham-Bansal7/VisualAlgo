import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import flowchartRoutes from './routes/sourceCodeRoutes.js';


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());

//connect to MongoDB
connectDB();

//middleware
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/flowcharts', flowchartRoutes);


//routes
app.get('/', (req, res) => {
  res.send('Welcome to the VisualAlgo Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});