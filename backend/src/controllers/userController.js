import express from 'express';
import authService from "../services/authService.js";
import asyncHandler from "../middleware/asyncHandler.js";

class UserController {
    register = asyncHandler(async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'All fields are required: firstName, lastName, email, password'
                }
            });
        }

        const result = await authService.register(firstName, lastName, email, password);
        
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    });

    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Email and password are required'
                }
            });
        }

        const result = await authService.login(email, password);
        
        if (result.success) {
            res.json(result);
        } else {
            res.status(401).json({
                success: false,
                error: {
                    message: result.message
                }
            });
        }
    });

    // Get current user profile (protected route)
    getProfile = asyncHandler(async (req, res) => {
        res.json({
            success: true,
            data: {
                user: req.user
            }
        });
    });
}

export default new UserController();