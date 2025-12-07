const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { createQuestion, getQuestions, getQuestionById } = require('../controllers/questionController');

const router = express.Router();

router.post('/', protect, isAdmin, createQuestion); // רק אדמין
router.get('/', protect, getQuestions);
router.get('/:id', protect, getQuestionById);

module.exports = router;
