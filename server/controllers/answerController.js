const Answer = require('../models/Answer');

const createAnswer = async (req, res) => {
  try {
    const { content } = req.body;

    const answer = await Answer.create({
      content,
      question: req.params.questionId,
      user: req.user._id,
    });

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Error creating answer' });
  }
};

const getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('user', 'name email');
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching answers' });
  }
};
const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.answerId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting answer' });
  }
};

module.exports = { createAnswer, getAnswersByQuestion , deleteAnswer };
