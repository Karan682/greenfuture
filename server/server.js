import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authenticateToken from './middleware.js';
import collaborationRoutes from './routes/collaborationRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/protected', authenticateToken, protectedRoutes);

app.listen(5000, () => console.log('Server is running...'));