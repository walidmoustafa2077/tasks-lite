import userService from "./userService.js";
import PasswordHelper from "../utils/passwordHelper.js";
import { generateToken } from "../utils/jwtUtils.js";
import config from "../config/config.js";

class AuthService {

    async register(firstName, lastName, email, password) {
        // Validate and create user
        const user = await userService.createUser(firstName, lastName, email, password);
        
        // Generate JWT token
        const token = generateToken(user);
        
        return {
            success: true,
            data: {
                user: user.userDTO(), 
                token,
                expiresIn: config.JWT_EXPIRES_IN
            }
        };
    }

    async login(email, password) {
        // Find user by email
        const user = userService.getUserByEmail(email);
        if (!user) {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }

        // Compare password
        const isPasswordValid = await PasswordHelper.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }

        // Generate JWT token
        const token = generateToken(user);
        
        return {
            success: true,
            data: {
                user: user.userDTO(), 
                token,
                expiresIn: config.JWT_EXPIRES_IN
            }
        };
    }
}

export default new AuthService();
