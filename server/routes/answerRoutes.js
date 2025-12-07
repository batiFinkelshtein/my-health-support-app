const express = require('express');

const { protect ,isAdmin} = require('../middleware/authMiddleware');
const { createAnswer, getAnswersByQuestion ,deleteAnswer } = require('../controllers/answerController');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createAnswer); 
router.get('/', protect, getAnswersByQuestion);
router.delete('/:answerId', protect, isAdmin, deleteAnswer);

module.exports = router;
