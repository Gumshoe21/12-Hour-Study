const mongoose = require('mongoose');

const TimerSchema = new mongoose.Schema({
  modes: {
    session: {
      id: {
        type: String,
        default: 'session'
      },
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
      id: {
        type: String,
        default: 'shortBreak'
      },
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
      id: {
        type: String,
        default: 'longBreak'
      },
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
    id: 'longBreakInterval',
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
  tickingSoundMuted: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Timer', TimerSchema);
