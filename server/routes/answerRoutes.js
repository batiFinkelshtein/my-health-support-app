const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createAnswer, getAnswersByQuestion } = require('../controllers/answerController');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createAnswer); 
router.get('/', protect, getAnswersByQuestion);

module.exports = router;
