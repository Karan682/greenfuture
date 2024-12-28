import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchRewards, redeemReward } from '../services/api';

const Reward = () => {
  const [rewards, setRewards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const response = await fetchRewards();
        setRewards(response.data);
      } catch (err) {
        console.error('Error fetching rewards:', err);
      }
    };

    loadRewards();
  }, []);

  const handleRedeem = async (rewardId) => {
    try {
      const response = await redeemReward(rewardId);
      setMessage(response.data.message);
      setRewards(rewards.filter((reward) => reward._id !== rewardId)); // Remove redeemed reward
    } catch (err) {
      console.error('Error redeeming reward:', err);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Rewards
      </Typography>
      <Grid container spacing={3}>
        {rewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward._id}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{reward.name}</Typography>
              <Typography variant="body2">Points: {reward.points}</Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => handleRedeem(reward._id)}
              >
                Redeem
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {message && <Typography color="primary" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default Reward;
