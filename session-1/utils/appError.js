class AppError extends Error {
  constructor() {
    super();
  }
  create(message, statusCode, statusText) {
    this.message = message;
    this.statusCode = statusCode || 500;
    this.statusText = statusText || "error";
    return this;
  }
}
module.exports = new AppError();
