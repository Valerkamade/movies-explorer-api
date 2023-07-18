const { ERROR_ACCESS } = require('../utils/constants'); // импорт кода статуса

// Ошибка доступа к чужим данным
class NotAccess extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_ACCESS;
    this.name = 'NotUniqueData';
  }
}

module.exports = NotAccess;
