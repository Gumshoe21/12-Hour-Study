const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const reportSchema = new mongoose.Schema(
  {
    stats: {
      session: {
        totalTimeAccumulated: {
          type: Number,
          default: 0,
        },
        instances: [
          {
            createdAt: {
              type: Date,
              default: new Date(),
            },
            timeAccumulated: {
              type: Number,
              default: 0,
            },
            stoppedAt: {
              type: Date,
              default: new Date(),
            },
          },
        ],
        completions: [Date],
      },
      shortBreak: {
        totalTimeAccumulated: {
          type: Number,
          default: 0,
        },
        instances: [
          {
            createdAt: {
              type: Date,
              default: new Date(),
            },
            timeAccumulated: {
              type: Number,
              default: 0,
            },
            stoppedAt: {
              type: Date,
              default: new Date(),
            },
          },
        ],
        completions: [Date],
      },
      longBreak: {
        totalTimeAccumulated: {
          type: Number,
          default: 0,
        },
        instances: [
          {
            createdAt: {
              type: Date,
              default: new Date(),
            },
            timeAccumulated: {
              type: Number,
              default: 0,
            },
            stoppedAt: {
              type: Date,
              default: new Date(),
            },
          },
        ],
        completions: [Date],
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A report must belong to a user.'],
    },
  },
  {
    timestamps: true,
  },
);

// reportSchema.index({ createdAt: 1 })
module.exports = mongoose.model('Report', reportSchema);
