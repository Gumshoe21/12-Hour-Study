const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema(
  {
    stats: {
      session: {
        totalTimeAccumulated: {
          type: Number,
          default: 0
        },
        instances: [
          {
            createdAt: {
              type: Date,
              default: new Date()
            },
            timeAccumulated: {
              type: Number,
              default: 0
            },
            stoppedAt: {
              type: Date,
              default: new Date()
            }
          }
        ],
        completions: [Date]
      },
      shortBreak: {
        totalTimeAccumulated: {
          type: Number,
          default: 0
        },
        instances: [
          {
            createdAt: {
              type: Date,
              default: new Date()
            },
            timeAccumulated: {
              type: Number,
              default: 0
            },
            stoppedAt: {
              type: Date,
              default: new Date()
            }
          }
        ],
        completions: [Date]
      },
      longBreak: {
        totalTimeAccumulated: {
          type: Number,
          default: 0
        },
        instances: [
          {
            createdAt: {
              type: Date,
              default: new Date()
            },
            timeAccumulated: {
              type: Number,
              default: 0
            },
            stoppedAt: {
              type: Date,
              default: new Date()
            }
          }
        ],
        completions: [Date]
      }
    },
    /*
    totalSessionTime: {
      type: Number,
      default: 0
    },
    modeCompletions: {
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
    },
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
    */
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A report must belong to a user.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Report', ReportSchema);
