import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import * as authController from '@src/controllers/auth.controller';
import * as authService from '@src/services/auth.service';

describe('AuthController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a user and return the user object and token', async () => {
      const user = { _id: 'userId', name: 'TestUser', email: 'testasd@gmail.com', password: 'password123', __v: 0 } as any;
      const token = 'jwtToken';
      jest.spyOn(authService, 'handleRegister').mockResolvedValue({ user, token });

      req.body = user;
      await authController.register(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ user, token });
    });
    it('should return an error if registration fails', async () => {
        const user = { name: 'Test User', email: 'test@example.com', password: 'password123' };
        jest.spyOn(authService, 'handleRegister').mockRejectedValue(new Error('Erro ao registrar usuário'));
      
        req.body = user;
        await authController.register(req as Request, res as Response, next);
      
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao registrar usuário' });
      });

    it('should return an error if registration fails', async () => {
      const user = { name: 'Test User', email: 'test@example.com', password: 'password123' };

      req.body = user;
      await authController.register(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao registrar usuário' });
    });
  });

  describe('login', () => {
    it('should return a token if login is successful', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const token = 'jwtToken';
      jest.spyOn(authService, 'handleLogin').mockResolvedValue(token);

      req.body = credentials;
      await authController.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token });
    });

    it('should return an error if credentials are invalid', async () => {
      const credentials = { email: 'test@example.com', password: 'wrongpassword' };
      jest.spyOn(authService, 'handleLogin').mockResolvedValue(null);

      req.body = credentials;
      await authController.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Credenciais inválidas' });
    });

    it('should return validation errors if input is invalid', async () => {
      const invalidCredentials = { email: 'invalid-email', password: '123' };
      jest.spyOn(authService, 'handleLogin').mockRejectedValue(new yup.ValidationError('Validation Error', invalidCredentials, 'loginSchema'));

      req.body = invalidCredentials;
      await authController.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
    });

    it('should return an error if login fails', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      jest.spyOn(authService, 'handleLogin').mockRejectedValue(new Error('Erro ao fazer login'));

      req.body = credentials;
      await authController.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao fazer login' });
    });
  });
});