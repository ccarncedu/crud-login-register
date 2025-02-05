import { registerSchema, loginSchema } from '@src/validators/auth.validators';

describe('Auth Validators', () => {
  describe('registerSchema', () => {
    it('should validate a valid registration object', async () => {
      const validData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(registerSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should throw an error if name is missing', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(registerSchema.validate(invalidData)).rejects.toThrow('Nome é obrigatório');
    });

    it('should throw an error if email is invalid', async () => {
      const invalidData = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123',
      };

      await expect(registerSchema.validate(invalidData)).rejects.toThrow('E-mail inválido');
    });

    it('should throw an error if password is too short', async () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '123',
      };

      await expect(registerSchema.validate(invalidData)).rejects.toThrow('Senha deve ter pelo menos 6 caracteres');
    });
  });

  describe('loginSchema', () => {
    it('should validate a valid login object', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(loginSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should throw an error if email is missing', async () => {
      const invalidData = {
        password: 'password123',
      };

      await expect(loginSchema.validate(invalidData)).rejects.toThrow('E-mail é obrigatório');
    });

    it('should throw an error if email is invalid', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      await expect(loginSchema.validate(invalidData)).rejects.toThrow('E-mail inválido');
    });

    it('should throw an error if password is missing', async () => {
      const invalidData = {
        email: 'test@example.com',
      };

      await expect(loginSchema.validate(invalidData)).rejects.toThrow('Senha é obrigatória');
    });
  });
});