const { ERROR_AUTH } = require('../utils/constants'); // импорт кода статуса

// Ошибка авторизации
class NotFoundAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_AUTH;
    this.name = 'NotFoundAuth';
  }
}

module.exports = NotFoundAuth;
