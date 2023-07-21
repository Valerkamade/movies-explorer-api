// Импорт пакетов
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error; // импорт ошибки валидации базы данных
const { JWT_SECRET, NODE_ENV } = require('../utils/config'); // импорт параметров
const {
  STATUS_OK,
  ERROR_CODE_UNIQUE,
  MAX_AGE_COOKIE,
  SALT_ROUNDS_HASH,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_UNIQUE,
  MESSAGE_CONFIRMATION,
  MESSAGE_NOT_FOUND,
  MESSAGE_VALIDATION,
} = require('../utils/constants'); // импорт констант
const User = require('../models/user'); // импорт схемы БД пользователь

// Импорт дописанных ошибок
const IncorrectData = require('../errors/incorrect-data'); // ошибка корректности данных
const NotUniqueData = require('../errors/unique-data'); // ошибка уникальности данных
const NotFoundError = require('../errors/not-found-err'); // ошибка поиска

// Контроллер запроса создания пользоваетля
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS_HASH)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(STATUS_OK).send(user.toJSON()))
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new NotUniqueData(MESSAGE_UNIQUE));
      } else if (err instanceof ValidationError) {
        next(new IncorrectData(MESSAGE_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// Контроллер запроса входа пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: MAX_AGE_COOKIE,
        httpOnly: true,
        sameSite: 'none',
        secure: NODE_ENV === 'production',
      })
        .send({ message: MESSAGE_CONFIRMATION });
    })
    .catch(next);
};

// Контроллек запроса выхода пользователя
module.exports.logout = (req, res) => {
  res.clearCookie('token')
    .send({ message: MESSAGE_CONFIRMATION });
};

// Вспомогательная функция по поиску в БД по id
const findById = (req, res, next, id) => {
  User.findById(id)
    .orFail(new NotFoundError(MESSAGE_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

// Контроллер запроса действующего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  findById(req, res, next, _id);
};

// Вспомогательная функция обновления данных пользователя
const updateUserData = (req, res, next, param) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, param, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new NotUniqueData(MESSAGE_UNIQUE));
      } else if (err instanceof ValidationError) {
        next(new ValidationError(MESSAGE_VALIDATION));
      } else {
        next(err);
      }
    });
};

// Контроллер запроса обновления данных пользователя
module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  updateUserData(req, res, next, { name, email });
};
