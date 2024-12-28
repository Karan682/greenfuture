import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchIdeas, submitFeedback } from '../services/api';

const FeedbackForm = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const response = await fetchIdeas();
        setIdeas(response.data);
      } catch (err) {
        console.error('Error fetching ideas:', err);
        setError('Failed to load ideas.');
      }
    };

    loadIdeas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIdeaId) {
      setError('Please select an idea.');
      return;
    }

    if (!feedback.trim()) {
      setError('Feedback cannot be empty.');
      return;
    }

    try {
      const response = await submitFeedback({ ideaId: selectedIdeaId, comment: feedback });
      setMessage(response.data.message);
      setFeedback('');
      setError('');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Failed to submit feedback.');
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Submit Feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Idea</InputLabel>
          <Select
            value={selectedIdeaId}
            onChange={(e) => setSelectedIdeaId(e.target.value)}
            required
          >
            {ideas.map((idea) => (
              <MenuItem key={idea._id} value={idea._id}>
                {idea.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Submit Feedback
        </Button>
      </form>
      {message && <Typography color="primary" sx={{ mt: 2 }}>{message}</Typography>}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default FeedbackForm;
