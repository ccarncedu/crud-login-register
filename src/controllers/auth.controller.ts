import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { registerUser, loginUser } from '../services/auth.service';
import jwt from 'jsonwebtoken';

const registerSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.log(error);
      res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(400).json({ error: 'Erro ao fazer login' });
    }
    next(error);
  }
};