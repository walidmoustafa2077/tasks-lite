import Task from "../models/task.js";
import { isValidStatus } from "../utils/updateTaskValidator.js";  

class TaskService {
  constructor() {
    this.tasks = [];
  }

  createTask(title, description, userId) {
    const newTask = new Task(Date.now(), title, description, userId);
    this.tasks.push(newTask);
    return newTask;
  }

  getAllTasks(userId = null) {
    if (userId) {
      return this.tasks.filter(task => task.userId === userId);
    }
    return this.tasks;
  }

  // Normalize id to a number before comparisons
  #toId(id) {
    const n = typeof id === 'number' ? id : Number(id);
    return Number.isNaN(n) ? null : n;
  }

  getTaskById(id, userId = null) {
    const key = this.#toId(id);
    if (key === null) return undefined;
    
    const task = this.tasks.find(task => task.id === key);
    
    // If userId is provided, ensure the task belongs to the user
    if (task && userId && task.userId !== userId) {
      return undefined; // Task doesn't belong to the user
    }
    
    return task;
  }

  updateTask(id, updatedFields, userId = null) {
    const task = this.getTaskById(id, userId);
    if (task) {
      Object.assign(task, updatedFields);

      if (updatedFields.status && !isValidStatus(updatedFields.status)) {
        throw new Error('Invalid status');
      }

      task.updatedAt = new Date();
      return task;
    }
    return null;
  }

  deleteTask(id, userId = null) {
    const taskIndex = this.tasks.findIndex(task => {
      const matchesId = task.id === this.#toId(id);
      const matchesUser = userId ? task.userId === userId : true;
      return matchesId && matchesUser;
    });
    
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}

export default new TaskService();
