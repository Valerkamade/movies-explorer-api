// Импорт пакетов
const router = require('express').Router();

// Импорт добавленных ошибок
const NotFoundError = require('../errors/not-found-err'); // ошибка поиска

// Импорт самописных данных
const { validateUserAuth, validateUserCreate } = require('../utils/validate'); // схемы валидации
const { login, createUser, logout } = require('../controllers/users'); // контроллеры
const { auth } = require('../middlewares/auth'); // проверка авторизации
const { MESSAGE_NOT_FOUND } = require('../utils/constants');

// Запросы на авторизацию и регистрацию
router.post(
  '/signin',
  validateUserAuth,
  login,
);
router.post(
  '/signup',
  validateUserCreate,
  createUser,
);

// Проверка авторизации
router.use(auth);

// Запросы к серверу по роутам users и movies
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

// Запрос на выход
router.use('/signout', logout);

// .оповещение об ошибке по несуществующим роутам
router.use('*', (req, res, next) => {
  next(new NotFoundError(MESSAGE_NOT_FOUND));
});

module.exports = router;
