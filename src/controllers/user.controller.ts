import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/user.service';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao fazer login' });
  }
};