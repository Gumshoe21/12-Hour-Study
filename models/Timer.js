const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new mongoose.Schema({
  modes: {
    session: {
      name: {
        type: String,
        default: 'Session',
        required: true
      },
      length: {
        type: Number,
        default: 30,
        required: true
      }
    },
    short_break: {
      name: {
        type: String,
        default: 'Short Break',
        required: true
      },
      length: {
        type: Number,
        default: 5,
        required: true
      }
    },
    long_break: {
      name: {
        type: String,
        default: 'Long Break',
        required: true
      },
      length: {
        type: Number,
        default: 15,
        required: true
      }
    }
  },
  long_break_interval: {
    type: Number,
    default: 4,
    required: true
  },
  active_mode: {
    type: String,
    default: 'session',
    required: true
  },
  ticking: {
    type: Boolean,
    default: false,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Timer', TimerSchema);
