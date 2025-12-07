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

module.exports = { createAnswer, getAnswersByQuestion };
