const Question = require('../models/Question');

const createQuestion = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can post questions' });
    }

    const question = await Question.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error creating question' });
  }
};


const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('user', 'name email');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('user', 'name email');
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching question' });
  }
};

module.exports = { createQuestion, getQuestions, getQuestionById };
