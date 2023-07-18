// Импорт кода ошибки
const { ERROR_DEFAULT } = require('../utils/constants');

// Общий обработчик ошибки
module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;

  res
    .status(statusCode) // выставить код статуса
    .send({
      // проверить статус и выставить сообщение в зависимости от него
      message: statusCode === ERROR_DEFAULT
        ? 'На сервере произошла ошибка'
        : message,
    });
  next(); // перенаправить на следующий обработчик
};
