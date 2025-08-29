class Task {
  constructor(id, title, description, userId, status = "todo") {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId; // Associate task with user
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default Task;
