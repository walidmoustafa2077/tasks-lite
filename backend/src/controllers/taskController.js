import TaskService from '../services/taskService.js';
import asyncHandler from '../middleware/asyncHandler.js';

class TaskController {
    constructor() {
        this.taskService = TaskService;
    }

    createTask = asyncHandler(async (req, res) => {
        const { title, description } = req.body;
        const userId = req.user.id;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Title and description are required'
                }
            });
        }

        const newTask = this.taskService.createTask(title, description, userId);
        res.status(201).json({
            success: true,
            data: newTask
        });
    });

    getAllTasks = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const tasks = this.taskService.getAllTasks(userId);
        res.json({
            success: true,
            data: tasks,
            count: tasks.length
        });
    });

    getTaskById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        const task = this.taskService.getTaskById(id, userId);
        
        if (task) {
            res.json({
                success: true,
                data: task
            });
        } else {
            res.status(404).json({
                success: false,
                error: {
                    message: 'Task not found'
                }
            });
        }
    });

    updateTask = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        
        try {
            const updatedTask = this.taskService.updateTask(id, req.body, userId);
            if (updatedTask) {
                res.json({
                    success: true,
                    data: updatedTask
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: {
                        message: 'Task not found'
                    }
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                error: {
                    message: error.message
                }
            });
        }
    });

    deleteTask = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        const deleted = this.taskService.deleteTask(id, userId);
        
        if (deleted) {
            res.json({
                success: true,
                message: 'Task deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                error: {
                    message: 'Task not found'
                }
            });
        }
    });
}

export default new TaskController();