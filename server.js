import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
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
const _dirname = path.resolve();


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/protected', authenticateToken, protectedRoutes);
app.use(express.static(path.join(_dirname, "/greenfuture/build")));
app.get('*',(req, res) => {
  res.sendFile(path.resolve(_dirname,"greenfuture", "build", "index.html"));
})

const PORT_URL = process.env.PORT || 5000;

app.listen(PORT_URL, () => console.log('Server is running...'));