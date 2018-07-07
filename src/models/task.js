import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String },
    description: { type: String },
    complete: { type: Boolean }
});

export const Task = mongoose.model('Task', taskSchema);
export default Task;