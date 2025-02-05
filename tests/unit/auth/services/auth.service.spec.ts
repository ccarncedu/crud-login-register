import * as authService from '@src/services/auth.service';
import User from '@src/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let userModel: any;

  beforeEach(async () => {
    userModel = {
      findOne: jest.fn(),
      findById: jest.fn(),
      save: jest.fn()
    };

    jest.spyOn(User, 'findOne').mockImplementation(userModel.findOne);
    jest.spyOn(User, 'findById').mockImplementation(userModel.findById);
    jest.spyOn(User.prototype, 'save').mockImplementation(userModel.save);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a user and return the user object', async () => {
      const name = 'Test User';
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';
      const user = { name, email, password: hashedPassword };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      userModel.save.mockResolvedValue(user);

      const result = await authService.registerUser(name, email, password);
      expect(result).toMatchObject(user);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(userModel.save).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should return a JWT token if login is successful', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';
      const user = { id: 'userId', email, password: hashedPassword };

      userModel.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(jwt, 'sign').mockReturnValue('jwtToken' as never);

      const result = await authService.loginUser(email, password);
      expect(result).toEqual('jwtToken');
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(jwt.sign).toHaveBeenCalledWith({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    });

    it('should return null if login fails', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      userModel.findOne.mockResolvedValue(null);

      const result = await authService.loginUser(email, password);
      expect(result).toBeNull();
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
    });
  });

  describe('validateUser', () => {
    it('should return user if found and email matches', async () => {
      const payload = { id: 'userId', email: 'test@example.com' };
      const user = { id: 'userId', email: 'test@example.com' };
      userModel.findById.mockResolvedValue(user);

      const result = await authService.validateUser(payload);
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      const payload = { id: 'userId', email: 'test@example.com' };
      userModel.findById.mockResolvedValue(null);

      const result = await authService.validateUser(payload);
      expect(result).toBeNull();
    });

    it('should return null if email does not match', async () => {
      const payload = { id: 'userId', email: 'test@example.com' };
      const user = { id: 'userId', email: 'wrong@example.com' };
      userModel.findById.mockResolvedValue(user);

      const result = await authService.validateUser(payload);
      expect(result).toBeNull();
    });
  });
});