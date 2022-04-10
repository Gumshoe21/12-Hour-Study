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
    short_break: {
      name: {
        type: String,
        default: 'Short Break'
      },
      length: {
        type: Number,
        default: 5
      }
    },
    long_break: {
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
  long_break_interval: {
    type: Number,
    default: 4
  },
  active_mode: {
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
