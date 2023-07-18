// Импорт пакетов
const jwt = require('jsonwebtoken');

// Импорт параметров
const { JWT_SECRET } = require('../utils/config');

// Импорт добавленных ошибок
const NotFoundAuth = require('../errors/not-found-auth'); // ошибка поиска

// Вспомогательная функция для ответа
const handleAuthError = (req, res, next) => next(new NotFoundAuth('Необходима авторизация'));

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
