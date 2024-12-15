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
app.use(cors({
    origin: "*",
}))

app.post("/send", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}, upload.array("files"), async (req, res) => {
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
            email,
            storeEmail
        } = req.body;

        if (!fullName || !phone || !store || !position || !workSchedule || !source || !preferredContactMethod || !agreement) {
            return res.status(400).json({error: "Все обязательные поля должны быть заполнены."});
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.example.ru",
            port: 465,
            secure: true,
            auth: {
                user: "example",
                pass: "example",
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
            email,
            comment,
        });

        const mailOptions = {
            from: '"Форма обратной связи" <example@yandex.ru>',
            to: ["example@yandex.ru", storeEmail],
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
