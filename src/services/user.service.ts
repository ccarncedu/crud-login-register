import prisma from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.findUnique({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }
  return null;
};