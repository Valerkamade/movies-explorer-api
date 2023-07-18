// Импорт пакетов
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Импорт дописаных ошибок
const NotFoundAuth = require('../errors/not-found-auth');

// Импорт констант
const { MAX_LENGTH_WORD, MIN_LENGTH_WORD } = require('../utils/constants');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  name: { // имя пользователя: строка длиной от 2 до 30 символов, по умолчанию Пользователь
    type: String,
    minlength: [MIN_LENGTH_WORD, 'Слишком короткое имя'],
    maxlength: [MAX_LENGTH_WORD, 'Слишком длинное имя'],
    default: 'Пользователь',
  },
  email: { // обязателдьное поле почта: уникальная строка
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Введен некорректный адрес почты',
    },
    required: true,
    unique: true,
  },
  password: { // обязательное поле пароль: строка, не передавать в схеме
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false }); // убирает версирование

// Статический метод схемы пользователя: поиск пользователя
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundAuth('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotFoundAuth('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// Метод схемы пользователь: удаление пароля из ответа
userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
