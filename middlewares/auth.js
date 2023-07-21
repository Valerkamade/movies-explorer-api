// Импорт пакетов
const jwt = require('jsonwebtoken');

// Импорт параметров
const { JWT_SECRET } = require('../utils/config');
const NotFoundAuth = require('../errors/not-found-auth'); // ошибка поиска
const { MESSAGE_NEED_AUTH } = require('../utils/constants'); // импорт констант

// Вспомогательная функция для ответа
const handleAuthError = (req, res, next) => next(new NotFoundAuth(MESSAGE_NEED_AUTH));

// Проверка авторизации
module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    if (!token) {
      return handleAuthError(req, res, next);
    }
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(req, res, next);
  }

  req.user = payload; // записать пейлоуд в объект запроса
  return next(); // пропустить запрос дальше
};
