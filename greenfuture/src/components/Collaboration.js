import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchCollaborations, postMessage } from '../services/api';

const Collaboration = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchCollaborations();
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await postMessage({ text: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Collaboration
      </Typography>
      <Paper sx={{ p: 3, mb: 2 }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {msg.author}
            </Typography>
            <Typography variant="body1">{msg.text}</Typography>
          </Box>
        ))}
      </Paper>
      <TextField
        fullWidth
        placeholder="Write your message here..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default Collaboration;
