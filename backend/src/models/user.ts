// src/models/user.ts
import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
  name: string;
  email: string;
  number: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
