const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReportSchema = new Schema({
  totalSessionTime: {
    type: Number
  },
  modeCompletions: [
    {
      sessions: {
        type: Number,
        default: 0
      },
      shortBreak: {
        type: Number,
        default: 0
      },
      longBreak: {
        type: Number,
        default: 0
      }
    }
  ],
  sessionInstances: [
    {
      createdAt: {
        type: Date,
        default: Date.now
      },
      timeAccumulated: {
        type: Number,
        default: 0
      }
    }
  ],
  timestamps: true
});

module.exports = mongoose.model('Report', ReportSchema);
