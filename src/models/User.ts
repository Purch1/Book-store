import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUserModel extends Document {
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  generateAuthToken(): string;
}

const userSchema: Schema<IUserModel> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Generate an authentication token (JWT) for the user
userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, "your-secret-key");
  return token;
};

// Hash the password before saving the user
userSchema.pre<IUserModel>("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

export default mongoose.model<IUserModel>("User", userSchema);


