import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


export const fetchIdeas = () => axios.get(`${API_BASE_URL}/ideas`);
export const fetchRewards = () => axios.get(`${API_BASE_URL}/rewards`);
export const redeemReward = (rewardId) => axios.post(`${API_BASE_URL}/rewards/redeem`, { rewardId });
export const submitIdea = async (ideaData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ideas/submit`, ideaData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    throw err.response.data; // Pass error message from backend
  }
};
export const fetchCollaborations = () => axios.get(`${API_BASE_URL}/collaborations`);
export const postMessage = (data) => axios.post(`${API_BASE_URL}/collaborations`, data);
export const fetchFeedbacks = (ideaId) => {
    if (!ideaId) {
      throw new Error('Idea ID is required to fetch feedback');
    }
    return axios.get(`${API_BASE_URL}/feedback/${ideaId}`, );
  };
  
export const submitFeedback = (data) => axios.post(`${API_BASE_URL}/feedback/submit`, data);
export const loginUser = (data) => axios.post(`${API_BASE_URL}/users/login`, data);
export const registerUser = (data) => axios.post(`${API_BASE_URL}/users/register`, data);
export const voteForIdea = (ideaId, voteDelta) =>
    axios.post(`${API_BASE_URL}/ideas/vote/${ideaId}`, { voteDelta });

  