import mongoose, { Document } from 'mongoose';
import UserSchema from '../schemas/user.schema';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const User = mongoose.model<IUser>('User', UserSchema);

export default User;