// Импорт пакетов
const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error; // импорт ошибки валидации базы данных
const {
  STATUS_OK, MESSAGE_INCORRECT_DATA, MESSAGE_NOT_FOUND, MESSAGE_CONFIRMATION, MESSAGE_NOT_ACCESS,
} = require('../utils/constants'); // импорт констант
const Movie = require('../models/movie'); // импорт схемы БД фильмов

// Импорт дописанных ошибок
const NotFoundError = require('../errors/not-found-err'); // ошибка поиска
const IncorrectData = require('../errors/incorrect-data'); // ошибка корректности данных
const NotAccess = require('../errors/not-access'); // ошибка доступа к чужим данным

// Контроллер запроса сохраненных фильмов пользователем
module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// Контроллер сохранения фильма в избранное
module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ owner: _id, ...req.body })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectData(MESSAGE_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// Контроллер удаления фильма из избранного
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .orFail(new NotFoundError(MESSAGE_NOT_FOUND))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new NotAccess(MESSAGE_NOT_ACCESS));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: MESSAGE_CONFIRMATION }));
    })
    .catch(next);
};
