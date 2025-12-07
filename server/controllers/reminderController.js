const path = require('path');
const fs = require('fs');
const Reminder = require('../models/Reminder');


function buildRepeatFromBody(body) {
  const frequency = body.frequency || body?.repeat?.frequency || 'none';
  const timesPerDay = body.timesPerDay ?? body?.repeat?.timesPerDay;
  const durationDays = body.durationDays ?? body?.repeat?.durationDays;

  const out = { frequency };
  if (timesPerDay !== undefined) out.timesPerDay = Number(timesPerDay);
  if (durationDays !== undefined) out.durationDays = Number(durationDays);
  return out;
}


const createReminder = async (req, res) => {
  try {
    const { title, description, date, type } = req.body;

    if (!title || !date || !type) {
      return res.status(400).json({ message: 'title, date, type are required' });
    }

    const payload = {
      user: req.user._id,
      title,
      description,
      type,
      date: new Date(date),
      repeat: buildRepeatFromBody(req.body)
    };

    if (req.file) {
      payload.imageUrl = `/uploads/${req.file.filename}`;
    }

    const reminder = await Reminder.create(payload);
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating reminder' });
  }
};

const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id }).sort({ date: 1, createdAt: -1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reminders' });
  }
};


const getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.id, user: req.user._id });
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reminder' });
  }
};

const updateReminder = async (req, res) => {
  try {
    const existing = await Reminder.findOne({ _id: req.params.id, user: req.user._id });
    if (!existing) return res.status(404).json({ message: 'Reminder not found' });

   
    if (req.body.title !== undefined) existing.title = req.body.title;
    if (req.body.description !== undefined) existing.description = req.body.description;
    if (req.body.type !== undefined) existing.type = req.body.type;
    if (req.body.date !== undefined) existing.date = new Date(req.body.date);

 
    const repeat = buildRepeatFromBody(req.body);
    if (repeat) existing.repeat = repeat;

   
    if (req.file) {

      if (existing.imageUrl && existing.imageUrl.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', existing.imageUrl);
        fs.promises.unlink(oldPath).catch(() => {});
      }
      existing.imageUrl = `/uploads/${req.file.filename}`;
    }

    const saved = await existing.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error updating reminder' });
  }
};


const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });

    if (reminder.imageUrl && reminder.imageUrl.startsWith('/uploads/')) {
      const p = path.join(__dirname, '..', reminder.imageUrl);
      fs.promises.unlink(p).catch(() => {});
    }

    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting reminder' });
  }
};

module.exports = {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder
};
