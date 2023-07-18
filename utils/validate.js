// Импорт пакетов
const { celebrate, Joi, Segments } = require('celebrate');

// Импорт констант
const { MIN_LENGTH_WORD, MAX_LENGTH_WORD, LENGTH_ID } = require('./constants');

// Импорт параметров
const { REGEX, REGEX_MOVIE } = require('./config');

// Схема валидации создания пользователя
module.exports.validateUserCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(MIN_LENGTH_WORD).max(MAX_LENGTH_WORD),
  }),
});

// Схема валидации авторизации
module.exports.validateUserAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Схема валидации изменения данных пользователя
module.exports.validateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(MIN_LENGTH_WORD).max(MAX_LENGTH_WORD).required(),
    email: Joi.string().required().email(),
  }),
});

// Схема валидации удаления фильма по id
module.exports.validateMovieID = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(LENGTH_ID).hex().required(),
  }),
});

// Схема валидации добавления фильма
module.exports.validateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(REGEX).required(),
    trailerLink: Joi.string().pattern(REGEX_MOVIE).required(),
    thumbnail: Joi.string().pattern(REGEX).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
