import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { voteForIdea } from '../services/api';

const VotingSystem = ({ ideaId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState('');

  const handleVote = async (voteDelta) => {
    try {
      const response = await voteForIdea(ideaId, voteDelta);
      setVotes(response.data.updatedVotes);
    } catch (err) {
      setError('Error updating votes. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button variant="outlined" onClick={() => handleVote(1)}>
        👍 
      </Button>
      <Typography>{votes}</Typography>
      <Button variant="outlined" onClick={() => handleVote(-1)}>
        👎 
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default VotingSystem;
