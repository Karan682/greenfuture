import mongoose from 'mongoose';

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  comments: [
        {
            text: String,
            userName: String, // Display name of the user
            createdAt: { type: Date, default: Date.now },
        },
    ]
});

const Idea = mongoose.model('Idea', IdeaSchema);
export default Idea;
