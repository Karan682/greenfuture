import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchFeedbacks, fetchIdeas } from '../services/api';
import VotingSystem from './VotingSystem';

const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchIdeas();
        setIdeas(response.data);

        const feedbackPromises = response.data.map(async (idea) => {
          const feedbackResponse = await fetchFeedbacks(idea._id);
          return { ideaId: idea._id, feedbacks: feedbackResponse.data };
        });

        const feedbackData = await Promise.all(feedbackPromises);

        const feedbackMap = feedbackData.reduce((acc, item) => {
          acc[item.ideaId] = item.feedbacks;
          return acc;
        }, {});

        setFeedbacks(feedbackMap);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {ideas.map((idea) => (
          <Grid item xs={12} md={6} key={idea._id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{idea.title}</Typography>
              <Typography variant="body1">{idea.description}</Typography>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
                Submitted by: {idea.submittedBy.name}
              </Typography>
              <VotingSystem ideaId={idea._id} initialVotes={idea.votes} />
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
                Feedback:
              </Typography>
              {feedbacks[idea._id]?.length > 0 ? (
                feedbacks[idea._id].map((feedback) => (
                  <Typography key={feedback._id} variant="body2">
                    - {feedback.comment}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">No feedback submitted yet.</Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
