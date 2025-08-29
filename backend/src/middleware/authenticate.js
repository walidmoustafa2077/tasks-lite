import { verifyToken, extractTokenFromHeader } from '../utils/jwtUtils.js';
import userService from '../services/userService.js';

/**
 * Authentication middleware to verify JWT tokens
 * Protects routes that require authentication
 */
const authenticate = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    console.log('Auth Header:', authHeader); // Debug log
    const token = extractTokenFromHeader(authHeader);
    console.log('Extracted Token:', token ? `${token.substring(0, 10)}...` : 'null'); // Debug log

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Access denied. No token provided.'
        }
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from service to ensure user still exists
    const user = userService.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Access denied. User not found.'
        }
      });
    }

    // Add user info to request object (without password)
    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Access denied. Invalid token.'
      }
    });
  }
};

export default authenticate;
