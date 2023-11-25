class ApiError extends Error {
  constructor({
    status,
    message,
  }) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends ApiError {
  constructor({
    message = 'Not Found',
  } = {}) {
    super({
      message,
      status: 404,
    });
  }
}

module.exports = {
  ApiError,
  NotFoundError,
}