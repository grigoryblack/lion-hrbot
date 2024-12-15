const axios = require('axios');
const fs = require('fs');

// Адрес URL, откуда будем получать данные
const url = 'http://192.168.20.19/hrm/hs/datazup/vacancies/';

// Логин и пароль для авторизации
const auth = {
    username: 'httptg',
    password: 'Di6QEsyw'
};

// Путь к файлу data.json
const filePath = '/var/Lion-tg-bot/data.json';

// Функция для получения и сохранения данных
async function fetchAndSaveData() {
    try {
        const response = await axios.get(url, {
            auth: auth,
            responseType: 'text'
        });

        // Сохранение всего содержимого страницы в указанный файл
        fs.writeFileSync(filePath, response.data, 'utf8');
        console.log(`Страница успешно сохранена в ${filePath}.`);
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
    }
}

// Запускаем функцию каждую минуту
setInterval(() => {
    fetchAndSaveData();
}, 60000); // 60000 миллисекунд = 1 минута

console.log('Запущен парсер. Страницы будут сохраняться каждую минуту.');