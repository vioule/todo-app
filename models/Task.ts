import mongoose from "mongoose";

export interface Tasks extends mongoose.Document {
  title: string;
  description: string;
  user: string;
}

const TaskSchema = new mongoose.Schema<Tasks>({
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  user: {
    type: String,
    required: [true, "Please provide a user id."],
  },
});

export default mongoose.models.Task ||
  mongoose.model<Tasks>("Task", TaskSchema);
