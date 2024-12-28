import express from 'express';
import authenticateToken from '../middleware.js';
import Idea from '../models/Idea.js';

const router = express.Router();

router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    // User ID is extracted by the authenticateToken middleware
    const submittedBy = req.user.id;

    const newIdea = new Idea({ title, description, submittedBy });
    await newIdea.save();

    res.status(201).json({ message: 'Idea submitted successfully.', idea: newIdea });
  } catch (err) {
    console.error('Error submitting idea:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find().populate('submittedBy', 'name');
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching ideas' });
  }
});


router.post('/vote/:id', async (req, res) => {
  const { id } = req.params;
  const { voteDelta } = req.body;

  try {
    const idea = await Idea.findById(id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    idea.votes += voteDelta;
    await idea.save();

    res.status(200).json({ updatedVotes: idea.votes });
  } catch (err) {
    res.status(500).json({ error: 'Error updating votes' });
  }
});


export default router;   