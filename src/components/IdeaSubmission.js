import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { submitIdea } from '../services/api'; // API service to call backend

const IdeaSubmission = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setError('Title and description are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      if (!token) {
        setError('You must be logged in to submit an idea.');
        return;
      }

      const response = await submitIdea(formData, token);
      setMessage(response.message); // Backend returns success message
      setFormData({ title: '', description: '' });
      setError('');
    } catch (err) {
      console.error('Error submitting idea:', err);
      setError('Failed to submit idea.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Submit Your Idea
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit Idea
        </Button>
      </form>
      {message && <Typography color="primary" sx={{ mt: 2 }}>{message}</Typography>}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Container>
  );
};

export default IdeaSubmission;