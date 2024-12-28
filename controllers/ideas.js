import Idea from '../models/ideas.js';

export const getideas = async (req, res) => {
    try {
      const ideas = await Idea.find({})
      res.status(200).json({
        ideas
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting ideas",
      });
    }
  };