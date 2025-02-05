import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  }
  return null;
};

export const validateUser = async (payload: jwt.JwtPayload) => {
  const user = await User.findById(payload.id);
  if (!user || user.email !== payload.email) {
    return null;
  }
  return user;
};