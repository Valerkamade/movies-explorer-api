// Числовые константы
const STATUS_OK = 201;
const ERROR_INCORRECT_DATA = 400;
const ERROR_AUTH = 401;
const ERROR_ACCESS = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_NOT_UNIQUE = 409;
const ERROR_DEFAULT = 500;
const ERROR_CODE_UNIQUE = 11000;
const MAX_AGE_COOKIE = 3600000 * 24 * 7;
const SALT_ROUNDS_HASH = 10;
const MIN_LENGTH_WORD = 2;
const MAX_LENGTH_WORD = 30;
const MAX_REQUESTS = 100;
const TIME_LIMIT_WINDOW = 15 * 60 * 1000;
const LENGTH_ID = 24;

// Текстовые константы
const MESSAGE_INCORRECT_DATA = 'Переданы некорректные данные';
const MESSAGE_NOT_FOUND = 'Страница по указанному маршруту не найдена.';
const MESSAGE_NOT_ACCESS = 'Нельзя удалять чужие данные';
const MESSAGE_CONFIRMATION = 'Действие успешно выполнено';
const MESSAGE_UNIQUE = 'Пользователь с таким email уже существует.';
const MESSAGE_VALIDATION = 'Данные введены в неверном формате';
const MESSAGE_NEED_AUTH = 'Необходима авторизация';
const MESSAGE_DEFAULT = 'На сервере произошла ошибка';
const MESSAGE_VALIDATION_URL = 'Введен некорректный адрес url';
const MESSAGE_ERROR_AUTH = 'Вы ввели неправильный логин или пароль.';
const MESSAGE_ERROR_PROFILE = 'При обновлении профиля произошла ошибка.';
const MESSAGE_ERROR_REGISTER = 'При регистрации пользователя произошла ошибка.';

module.exports = {
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  STATUS_OK,
  ERROR_NOT_UNIQUE,
  ERROR_AUTH,
  ERROR_ACCESS,
  ERROR_CODE_UNIQUE,
  MAX_AGE_COOKIE,
  SALT_ROUNDS_HASH,
  MIN_LENGTH_WORD,
  MAX_LENGTH_WORD,
  MAX_REQUESTS,
  TIME_LIMIT_WINDOW,
  LENGTH_ID,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_NOT_FOUND,
  MESSAGE_NOT_ACCESS,
  MESSAGE_CONFIRMATION,
  MESSAGE_UNIQUE,
  MESSAGE_VALIDATION,
  MESSAGE_NEED_AUTH,
  MESSAGE_DEFAULT,
  MESSAGE_VALIDATION_URL,
  MESSAGE_ERROR_AUTH,
  MESSAGE_ERROR_PROFILE,
  MESSAGE_ERROR_REGISTER,
};
