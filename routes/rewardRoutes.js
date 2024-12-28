import { Router } from 'express';
const router = Router();

let rewards = [
  { _id: '1', name: 'Amazon Gift Card', points: 50 },
  { _id: '2', name: 'Starbucks Voucher', points: 30 },
  { _id: '3', name: 'Movie Night', points: 20 },
  { _id: '4', name: 'PlatStore Gift Card', points: 25 },
  { _id: '5', name: 'Mcd Voucher', points: 15 },
];

// Fetch all rewards
router.get('/', (req, res) => {
  res.json(rewards);
});

// Redeem a reward
router.post('/redeem', (req, res) => {
  const { rewardId } = req.body;
  const rewardIndex = rewards.findIndex((reward) => reward._id === rewardId);

  if (rewardIndex !== -1) {
    rewards.splice(rewardIndex, 1); // Remove reward
    res.json({ message: 'Reward redeemed successfully' });
  } else {
    res.status(404).json({ error: 'Reward not found' });
  }
});

export default router;
