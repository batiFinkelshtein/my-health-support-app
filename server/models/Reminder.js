const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  
  type: { type: String, enum: ['appointment', 'medication'], required: true },

  title: { type: String, required: true },
  description: { type: String },

  
  date: { type: Date, required: true },

 
  repeat: {
    frequency: { type: String, enum: ['none', 'hourly', 'daily', 'weekly'], default: 'none' },
    timesPerDay: { type: Number },
    durationDays: { type: Number }
  },

  imageUrl: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
