const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true, // transform email string to lowercase
    validate: [validator.isEmail, 'Please provide a valid email address.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    validate: [
      validator.isAlphanumeric,
      'Username must contain only letters and numbers (a-z, A-Z, 0-9)'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false // won't show in output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
    validate: {
      // this only works on save! this is crucial - remember this. won't work on update
      validator: function(el) {
        return el === this.password; // abc === abc === true;
      },
      message: 'Passwords are not the same'
    }
  },
  timezone: {
    type: String,
    required: [true, 'Timezone is required.'],
  },
  avatar: {
    type: String
  },
  website: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  socials: {
    github: {
      name: {
        type: String,
        default: 'github'
      },
      url: {
        type: String,
        default: ''
      }
    },
    twitter: {
      name: {
        type: String,
        default: 'twitter'
      },
      url: {
        type: String,
        default: ''
      }
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  timer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Timer'
  }
});

// Password Encryption - 'pre' is between getting data and saving data to db
// WORKS WHEN PASSWORD IS CHANGED OR WHEN THE PASSWORD IS NEWLY CREATED
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // If the password hasn't been changed, exit this function and move on to the next middleware.
  this.password = await bcrypt.hash(this.password, 12); // second param is cost, or how CPU intensive the process will be and how much better the encryption will be
  this.passwordConfirm = undefined; // effectively deletes passwordConfirm i.e. avoid persisting this field to db
  next();
});

// set the passwordChangedAt key if the password is new (i.e. new User) or the password was updated.
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next(); // if we didn't manip the password property or the pass is new, don't manip the passwordChangedAt;

  // The problem is that sometimes saving to the database is a bit slower than issuing the JSON Web Token, making it so that the changed password timestamp is sometimes set a bit after the JSON Web Token has been created. And so that will then make it so that the user will not be able to log in using the new token. Because, remember, the whole reason this timestamp here actually exists, is so that we can compare it with the timestamp on the JSON Web Token, right? So, just to remember, it is, well, so right here, where we check if the user has changed the password after the token was issued. And so, we just need to fix that by subtracting one second. And so that then will put the passwordChangedAt one second in the past, okay, which will then of course, not be 100% accurate, but that's not a problem at all, because one second here doesn't make any difference at all. So putting this passwordChanged one second in the past, will then ensure that the token is always created after the password has been changed.
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  // this points to the current document
  // check if user changed password after jwt timestamp
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  // false = not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex'); // resetToken = "temoprary password"
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return this.passwordResetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
