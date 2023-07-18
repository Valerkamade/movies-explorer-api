// Импорт пакетов
const rateLimit = require('express-rate-limit');

// Импорт констант
const { TIME_LIMIT_WINDOW, MAX_REQUESTS } = require('./constants');

// Выгрузка констант из окружения с предустановленными значениями
const {
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = '6f241197a7c4082fb0426e484d2cc9c2d38f670e9c15a0d04d152f1fbeff13ff',
  NODE_ENV,
} = process.env;

// Настройки лимитера
const LIMITER = rateLimit({
  windowMs: TIME_LIMIT_WINDOW, // ограничение окна в 15 минут
  max: MAX_REQUESTS, // ограничение количества запросов в окно времени
  standardHeaders: true, // информация об ограничении времени в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключение заголовка `X-RateLimit-*`
});

// Виды запросов для cors
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// Массив доменов, с которых разрешены кросс-доменные запросы
const ALLOWED_CORS = [
  'https://savemovies.valerkamade.ru',
  'http://savemovies.valerkamade.ru',
  'https://localhost:3001',
  'http://localhost:3001',
];

// Регулярные выражения
const REGEX = /^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/;
const REGEX_MOVIE = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|rutube\.ru)\/(.+)$/;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO,
  NODE_ENV,
  LIMITER,
  DEFAULT_ALLOWED_METHODS,
  ALLOWED_CORS,
  REGEX,
  REGEX_MOVIE,
};
