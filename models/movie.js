// Импорт пакетов
const mongoose = require('mongoose');
const validator = require('validator');

// Определение схемы фильмов
const cardSchema = new mongoose.Schema({
  country: { // обязательное поле страна создания фильма: строка
    type: String,
    required: true,
  },
  director: { // обязательное поле режиссер фильма: строка
    type: String,
    required: true,
  },
  duration: { // обязательное поле продолжительность фильма: строка
    type: Number,
    required: true,
  },
  year: { // обязательное поле год выпуска фильма: строка
    type: String,
    required: true,
  },
  description: { // обязательное поле описание фильма: строка
    type: String,
    required: true,
  },
  image: { // обязательное поле ссылка на постер к фильму: строка, URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введен некорректный адрес url',
    },
  },
  trailerLink: { // обязательное поле ссылка на трейлер фильма: строка, URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введен некорректный адрес url',
    },
  },
  thumbnail: { // обязательное поле миниатюрное изображение постера к фильму: строка, URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введен некорректный адрес url',
    },
  },
  owner: { // обязательное поле _id пользователя, который сохранил фильм: из схемы потльзователя
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // обязательное поле id фильма, из ответа сервиса MoviesExplorer: число
    type: Number,
    required: true,
  },
  nameRU: { // обязательное поле название фильма на русском языке: строка
    type: String,
    required: true,
  },
  nameEN: { // обязательное поле название фильма на английском языке: строка
    type: String,
    required: true,
  },
}, { versionKey: false }); // убирает версирование

module.exports = mongoose.model('movie', cardSchema);
