const { ERROR_NOT_FOUND } = require('../utils/constants'); // импорт кода статуса

// Ошибка поиска
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
