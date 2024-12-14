export const    generateMailHTML = ({
                                     fullName,
                                     phone,
                                     store,
                                     position,
                                     workSchedule,
                                     desiredSchedule = "Не указан",
                                     source,
                                     email,
                                     preferredContactMethod,
                                     comment = "Не указан",
                                 }) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h3 style="color: #FF4545;">Новая заявка с формы обратной связи</h3>
        <p><strong>ФИО:</strong> ${fullName}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Магазин:</strong> ${store}</p>
        <p><strong>Должность:</strong> ${position}</p>
        <p><strong>График работы:</strong> ${workSchedule}</p>
        <p><strong>Желаемый график работы:</strong> ${desiredSchedule}</p>
        <p><strong>Источник:</strong> ${source}</p>
        <p><strong>Предпочтительный способ связи:</strong> ${preferredContactMethod}</p>
        ${email ? `<p><strong>E-mail:</strong> ${email}</p>` : ""}
        <p><strong>Комментарий:</strong> ${comment}</p>
    </div>
`;
