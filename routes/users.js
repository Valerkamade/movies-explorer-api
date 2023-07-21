// Импорт пакетов
const router = require('express').Router();

// Импорт схемы валидации
const { validateUser } = require('../utils/validate');
const { getCurrentUser, updateUserProfile } = require('../controllers/users'); // контроллеры

router.get('/me', getCurrentUser); // запросить информацию об активном пользователе
router.patch('/me', validateUser, updateUserProfile); // изменить данные пользователя

module.exports = router;
