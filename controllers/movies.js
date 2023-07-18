// Импорт пакетов
const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error; // импорт ошибки валидации базы данных
const { STATUS_OK } = require('../utils/constants'); // импорт кода положительного ответа сервера при создании чего-либо
const Movie = require('../models/movie'); // импорт схемы БД фильмов

// Импорт дописанных ошибок
const NotFoundError = require('../errors/not-found-err'); // ошибка поиска
const IncorrectData = require('../errors/incorrect-data'); // ошибка корректности данных
const NotAccess = require('../errors/not-access'); // ошибка доступа к чужим данным

// Контроллер запроса всех фильмов
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// Контроллер сохранения фильма в избранное
module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: _id,
  })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectData('Переданы некорректные данные при создании фильма'));
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
    .orFail(new NotFoundError(`Передан не существующий id:${movieId} фильма`))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new NotAccess('Нельзя удалять чужие фильмы'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch(next);
};
