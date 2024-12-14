/**
* @fileoverview Документация по запуску и настройке проекта.
*
* Этот файл содержит инструкции по запуску, первичной настройке и продакшен-развертыванию проекта, включая использование Nodemailer для отправки почты.
  */

/**
* Шаги по первичной настройке проекта:
*
* 1. Установите все зависимости:
*    - Запустите команду `npm install` в корневом каталоге проекта.
*    - Убедитесь, что все зависимости, включая серверную часть и клиентскую (Vite), установлены.
*
* 2. Настройте переменные окружения:
*    - Для работы с Nodemailer создайте файл `.env` в корневом каталоге проекта.
*    - Укажите параметры SMTP для вашего почтового сервера (например, для Gmail или другого провайдера).
*    - Пример:
*      ```
*      MAIL_HOST=smtp.your-email-provider.com
*      MAIL_PORT=587
*      MAIL_USER=your-email@example.com
*      MAIL_PASS=your-email-password
*      ```
*
* 3. Настройка серверной части:
*    - Убедитесь, что в `server/server.js` правильно настроен сервер для использования Nodemailer.
*    - Подключите Nodemailer с использованием настроек, указанных в `.env`.
*    - Пример кода:
*      ```js
*      const nodemailer = require('nodemailer');
*      require('dotenv').config();  // Загрузка переменных окружения из .env
*
*      const transporter = nodemailer.createTransport({
*          host: process.env.MAIL_HOST,
*          port: process.env.MAIL_PORT,
*          auth: {
*              user: process.env.MAIL_USER,
*              pass: process.env.MAIL_PASS
*          }
*      });
*
*      // Пример отправки письма:
*      transporter.sendMail({
*          from: 'your-email@example.com',
*          to: 'recipient@example.com',
*          subject: 'Test Email',
*          text: 'This is a test email sent from Node.js using Nodemailer.'
*      });
*      ```
*
* 4. Настройте клиентскую часть:
*    - Убедитесь, что клиентская часть правильно настроена с использованием Vite.
*    - Проверьте конфигурацию в `vite.config.js`.
       */

/**
* Запуск и разработка:
* Для разработки используйте следующие команды:
*
* 1. Запуск клиента и сервера в режиме разработки:
*    - Команда `npm run dev` запускает два процесса одновременно:
*      - `vite` для клиента.
*      - `node server/server.js` для сервера.
*    - Веб-сервер будет доступен на `http://localhost:3000` (по умолчанию).
*
* 2. Запуск только клиента (в режиме разработки):
*    - Используйте команду `npm run client`, чтобы запустить только клиентскую часть на Vite.
*
* 3. Запуск только сервера (в режиме разработки):
*    - Используйте команду `npm run server`, чтобы запустить только серверную часть.
       */

/**
* Продакшн сборка и запуск:
*
* 1. Сборка проекта для продакшн:
*    - Для сборки клиентской и серверной частей выполните команду `npm run build`.
*    - Эта команда выполняет:
*      - `npm run build:client`: создает клиентскую сборку с помощью Vite.
*      - `npm run build:server`: компилирует серверный код с помощью TypeScript (`tsc -b`).
*
* 2. Запуск проекта в продакшн режиме:
*    - После выполнения сборки используйте команду `npm run start` для запуска сервера.
*    - Сервер будет работать с уже скомпилированной сборкой.
*    - Примечание: если сервер работает на `Node.js`, необходимо убедиться, что серверный код находится в каталоге, где запускается `node server.js`.
       */

/**
* Прочие команды:
*
* 1. Просмотр сгенерированного контента:
*    - Используйте команду `npm run preview` для предварительного просмотра сгенерированной клиентской части.
*    - Эта команда запускает локальный сервер с уже скомпилированным клиентом.
*
* 2. Линтинг кода:
*    - Используйте команду `npm run lint` для проверки клиентской части на ошибки форматирования с использованием ESLint.
       */

/**
* Скрипты в package.json:
*
*  - "client": "vite" — Запускает клиентскую часть с Vite.
*  - "server": "node server/server.js" — Запускает сервер.
*  - "dev": "concurrently \"npm run client\" \"npm run server\"" — Запускает одновременно клиент и сервер в режиме разработки.
*  - "build:client": "vite build --cwd client" — Собирает клиентскую часть для продакшн.
*  - "build:server": "tsc -b" — Компилирует серверный код с использованием TypeScript.
*  - "build": "npm run build:client && npm run build:server" — Выполняет сборку и клиента, и сервера.
*  - "preview": "vite preview --cwd client" — Просмотр сгенерированной сборки клиентской части.
*  - "lint": "eslint client" — Запуск линтинга для проверки клиентского кода.
*  - "start": "npm run build && node server.js" — Запускает сервер в продакшн-режиме после сборки.
     */
