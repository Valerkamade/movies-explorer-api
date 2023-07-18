// Импорты пакетов
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

// Импорты самописных данных
const { PORT, MONGO, LIMITER } = require('./utils/config'); // параметры
const responseError = require('./middlewares/response-error'); // общий обработчик ошибок
const router = require('./routes'); // роуты
const { requestLogger, errorLogger } = require('./middlewares/logger'); // логгеры ошибок и запросов
const cors = require('./middlewares/cors'); // настройка cors

// Создать приложение
const app = express();

app.use(cors); // разрешение кроссдоменных запросов
app.use(express.json()); // обработка запросов json
app.use(helmet()); // защита от веб-уязвимостей
app.use(LIMITER); // ограничение запросов ко всем роутам
app.use(cookieParser()); // для извлечения данных из куков

mongoose.connect(MONGO); // подключение к базе данных

app.use(requestLogger); // подключение логгера запросов
app.use(router); // подключение роутов
app.use(errorLogger); // подключение логгера ошибок

// Обработчики ошибок(celebrate и централизованный)
app.use(errors());
app.use(responseError);

// Прослушивание порта
app.listen(PORT);
