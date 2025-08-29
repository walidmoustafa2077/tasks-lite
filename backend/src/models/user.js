
class User {
  constructor(id, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Get user object without password
   * @returns {Object} User object without password
   */
  userDTO() {
    const { password, id, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

export default User;
