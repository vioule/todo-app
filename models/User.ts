import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  verifyToken: string;
}

const UserSchema = new mongoose.Schema<Users>({
  name: {
    type: String,
    required: [true, "Please provide a name for this user."],
    maxlength: [60, "Name cannot be more than 60 characters."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    default: null,
  },
});

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
