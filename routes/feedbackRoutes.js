import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Fetch feedback by ideaId
router.get('/:ideaId', async (req, res) => {
  const { ideaId } = req.params;

  if (!ideaId) {
    return res.status(400).json({ error: 'Idea ID is required.' });
  }

  try {
    const feedbacks = await Feedback.find({ ideaId });

    // Return an empty array if no feedback exists for the ideaId
    if (feedbacks.length === 0) {
      return res.status(200).json([]); // Return an empty array instead of 404
    }

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ error: 'Failed to fetch feedbacks.' });
  }
});

router.post('/submit', async (req, res) => {
  const { ideaId, comment } = req.body;

  if (!ideaId || !comment) {
    return res.status(400).json({ error: 'Idea ID and feedback comment are required.' });
  }

  try {
    const feedback = new Feedback({ ideaId, comment });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ error: 'Failed to save feedback.' });
  }
});

export default router;
