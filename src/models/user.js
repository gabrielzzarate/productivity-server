import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    email: String,
    password: String,
});

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); } 
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('user', UserSchema);
export default User;