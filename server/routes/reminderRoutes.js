const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder
} = require('../controllers/reminderController');

const router = express.Router();

router.post('/', protect, upload.single('image'), createReminder);
router.get('/', protect, getReminders);
router.get('/:id', protect, getReminderById);
router.put('/:id', protect, upload.single('image'), updateReminder);
router.delete('/:id', protect, deleteReminder);

module.exports = router;
