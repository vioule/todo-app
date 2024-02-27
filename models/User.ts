import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  name: string;
}

const UserSchema = new mongoose.Schema<Users>({
  name: {
    type: String,
    required: [true, "Please provide a name for this user."],
    maxlength: [60, "Name cannot be more than 60 characters."],
  },
});

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
