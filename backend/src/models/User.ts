import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  userName: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
