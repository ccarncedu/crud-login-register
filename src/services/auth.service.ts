import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../validators/auth.validators';

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

export const handleRegister = async (body: any) => {
  await registerSchema.validate(body, { abortEarly: false });
  const { name, email, password } = body;
  const user = await registerUser(name, email, password);
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  return { user, token };
};

export const handleLogin = async (body: any) => {
  await loginSchema.validate(body, { abortEarly: false });
  const { email, password } = body;
  const token = await loginUser(email, password);
  return token;
};