import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { handleRegister, handleLogin } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user, token } = await handleRegister(req.body);
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
    const token = await handleLogin(req.body);
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