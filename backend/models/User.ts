import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jwtToken: { type: String, required: false },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
