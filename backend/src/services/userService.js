import User from "../models/user.js";
import PasswordHelper from "../utils/passwordHelper.js";
import { IsExist, ValidateEmail, ValidatePassword } from "../utils/userValidator.js";

class UserService {
  constructor() {
    this.users = [];
  }

  async createUser(firstName, lastName, email, password) {
    if (!ValidateEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!ValidatePassword(password)) {
      throw new Error("Invalid password format");
    }
    if (IsExist(email, this.users)) {
      throw new Error("User already exists");
    }
    
    const id = this.users.length + 1;
    const newUser = new User(id, firstName, lastName, email, password);
    
    // Hash the password before storing
    newUser.password = await PasswordHelper.hashPassword(password);

    this.users.push(newUser);
    return newUser;
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  getAllUsers() {
    return this.users;
  }

  updateUser(id, updatedData) {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, updatedData);
      return user;
    }
    return null;
  }

  deleteUser(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default new UserService();
