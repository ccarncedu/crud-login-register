"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService = __importStar(require("../../../../src/services/auth.service"));
const user_model_1 = __importDefault(require("../../../../src/models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('AuthService', () => {
    let userModel;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        userModel = {
            findOne: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        };
        jest.spyOn(user_model_1.default, 'findOne').mockImplementation(userModel.findOne);
        jest.spyOn(user_model_1.default, 'findById').mockImplementation(userModel.findById);
        jest.spyOn(user_model_1.default.prototype, 'save').mockImplementation(userModel.save);
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('registerUser', () => {
        it('should register a user and return the user object', () => __awaiter(void 0, void 0, void 0, function* () {
            const name = 'Test User';
            const email = 'test@example.com';
            const password = 'password123';
            const hashedPassword = 'hashedPassword123';
            const user = { id: 'userId', name, email, password: hashedPassword };
            jest.spyOn(bcryptjs_1.default, 'hash').mockResolvedValue(hashedPassword);
            userModel.save.mockResolvedValue(user);
            const result = yield authService.registerUser(name, email, password);
            expect(result).toEqual(user);
            expect(bcryptjs_1.default.hash).toHaveBeenCalledWith(password, 10);
            expect(userModel.save).toHaveBeenCalled();
        }));
    });
    describe('loginUser', () => {
        it('should return a JWT token if login is successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const email = 'test@example.com';
            const password = 'password123';
            const hashedPassword = 'hashedPassword123';
            const user = { id: 'userId', email, password: hashedPassword };
            userModel.findOne.mockResolvedValue(user);
            jest.spyOn(bcryptjs_1.default, 'compare').mockResolvedValue(true);
            jest.spyOn(jsonwebtoken_1.default, 'sign').mockReturnValue('jwtToken');
            const result = yield authService.loginUser(email, password);
            expect(result).toEqual('jwtToken');
            expect(userModel.findOne).toHaveBeenCalledWith({ email });
            expect(bcryptjs_1.default.compare).toHaveBeenCalledWith(password, hashedPassword);
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        }));
        it('should return null if login fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const email = 'test@example.com';
            const password = 'password123';
            userModel.findOne.mockResolvedValue(null);
            const result = yield authService.loginUser(email, password);
            expect(result).toBeNull();
            expect(userModel.findOne).toHaveBeenCalledWith({ email });
        }));
    });
    describe('validateUser', () => {
        it('should return user if found and email matches', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = { id: 'userId', email: 'test@example.com' };
            const user = { id: 'userId', email: 'test@example.com' };
            userModel.findById.mockResolvedValue(user);
            const result = yield authService.validateUser(payload);
            expect(result).toEqual(user);
        }));
        it('should return null if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = { id: 'userId', email: 'test@example.com' };
            userModel.findById.mockResolvedValue(null);
            const result = yield authService.validateUser(payload);
            expect(result).toBeNull();
        }));
        it('should return null if email does not match', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = { id: 'userId', email: 'test@example.com' };
            const user = { id: 'userId', email: 'wrong@example.com' };
            userModel.findById.mockResolvedValue(user);
            const result = yield authService.validateUser(payload);
            expect(result).toBeNull();
        }));
    });
});
