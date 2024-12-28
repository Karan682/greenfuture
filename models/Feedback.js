import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  ideaId: { type: String, required: true }, // Treated as email in this case
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', FeedbackSchema);
