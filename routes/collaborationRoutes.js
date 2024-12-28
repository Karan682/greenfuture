import express from 'express';
const router = express.Router();

let messages = [
    {
        _id: "1",
        author: "Alice",
        text: "I have a great idea for reducing energy consumption in our project!",
        timestamp: "2024-12-21T10:15:30Z"
    },
    {
        _id: "2",
        author: "Bob",
        text: "That sounds interesting, Alice. Can you share more details?",
        timestamp: "2024-12-21T10:18:45Z"
    },
    {
        _id: "3",
        author: "Charlie",
        text: "I think we should consider implementing solar panels. They could help us achieve our green goals.",
        timestamp: "2024-12-21T10:20:00Z"
    },
    {
        _id: "4",
        author: "Alice",
        text: "Great idea, Charlie! Maybe we can combine that with energy-saving appliances.",
        timestamp: "2024-12-21T10:25:30Z"
    },
    {
        _id: "5",
        author: "Dana",
        text: "I agree! Also, let’s ensure we calculate the cost-benefit ratio to justify the investment.",
        timestamp: "2024-12-21T10:30:15Z"
    }
];

// Fetch all collaboration messages
router.get('/', (req, res) => {
    res.json(messages);
});

// Post a new collaboration message
router.post('/', (req, res) => {
    const { text, author = 'Anonymous' } = req.body;
    const newMessage = { 
        _id: String(messages.length + 1),
        text, 
        author, 
        timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

export default router;
