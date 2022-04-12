const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new mongoose.Schema({
  modes: {
    session: {
      name: {
        type: String,
        default: 'Session'
      },
      length: {
        type: Number,
        default: 30
      }
    },
    shortBreak: {
      name: {
        type: String,
        default: 'Short Break'
      },
      length: {
        type: Number,
        default: 5
      }
    },
    longBreak: {
      name: {
        type: String,
        default: 'Long Break'
      },
      length: {
        type: Number,
        default: 15
      }
    }
  },
  longBreakInterval: {
    type: Number,
    default: 4
  },
  activeMode: {
    type: String,
    default: 'session'
  },
  ticking: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Timer', TimerSchema);
