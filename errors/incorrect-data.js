const { ERROR_INCORRECT_DATA } = require('../utils/constants'); // импорт кода статуса

// Ошибка корректности данных
class IncorrectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_DATA;
    this.name = 'IncorrectData';
  }
}

module.exports = IncorrectData;
