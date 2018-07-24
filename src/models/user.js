import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    age: { type: Number }
});

export const User = mongoose.model('User', userSchema);
export default User;