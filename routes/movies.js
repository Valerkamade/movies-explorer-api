// Импорт пакетов
const router = require('express').Router();

// Импорт самописных данных
const { validateMovie, validateMovieID } = require('../utils/validate'); // схем валидации
const { getMovies, deleteMovie, createMovie } = require('../controllers/movies'); // контроллеры

router.get('/', getMovies); // запросить фильмы
router.post('/', validateMovie, createMovie); // создать фильм (добавить в избранное)
router.delete('/:movieId', validateMovieID, deleteMovie); // удалить фильмы (удалить из избранного)

module.exports = router;
