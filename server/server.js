import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import {generateMailHTML} from "./config/mailTemplate.js";

const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {fileSize: 5 * 1024 * 1024},
});

app.use(express.json());
app.use(cors());

app.post("/send", upload.array("files"), async (req, res) => {
    try {
        const {
            fullName,
            phone,
            store,
            position,
            workSchedule,
            desiredSchedule,
            source,
            preferredContactMethod,
            comment,
            agreement,
        } = req.body;

        if (!fullName || !phone || !store || !position || !workSchedule || !source || !preferredContactMethod || !agreement) {
            return res.status(400).json({error: "Все обязательные поля должны быть заполнены."});
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: "drz2002@yandex.ru",
                pass: "ipuyaysejovokboe",
            },
        });

        const attachments = req.files.map((file) => ({
            filename: Buffer.from(file.originalname, "latin1").toString("utf-8"),
            content: file.buffer,
        }));

        const mailHTML = generateMailHTML({
            fullName,
            phone,
            store,
            position,
            workSchedule,
            desiredSchedule,
            source,
            preferredContactMethod,
            comment,
        });

        const mailOptions = {
            from: '"Форма обратной связи" <drz2002@yandex.ru>',
            to: "bathedultrapro@yandex.ru",
            subject: "Новая заявка с формы обратной связи",
            html: mailHTML,
            attachments,
        };

        await transporter.sendMail(mailOptions);

        req.files.forEach(file => file.buffer = null)

        res.status(200).json({message: "Форма успешно отправлена!"});
    } catch (error) {
        console.error("Ошибка при отправке формы:", error);
        res.status(500).json({error: "Произошла ошибка при отправке формы."});
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});