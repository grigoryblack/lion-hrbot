import {useState, useEffect} from "react";
import axios from "axios";
import {Form, notification} from "antd";
import data from "./assets/config/data.json";
import AppView from "./App.view.tsx";

const AppServices = () => {
    /** Локация магаза */
    const [positions, setPositions] = useState([]);
    /** График */
    const [schedules, setSchedules] = useState([]);
    /** Флаг показа модалки */
    const [isModalVisible, setIsModalVisible] = useState(false);
    /** Лоадер */
    const [loading, setLoading] = useState(false);
    /** Основная форма */
    const [form] = Form.useForm();

    /** Запрещаем scroll во время загрузки */
    useEffect(() => {
        if (loading) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
        } else {
            const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollY);
        }

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
        };
    }, [loading]);

    /** Обрабатывает выбор магазина, обновляя должности и графики */
    const handleStoreChange = (storeCode: string) => {
        const selectedStore = data.Результат.find(
            (store) => store.КодМагазина === storeCode
        );

        if (selectedStore) {
            setPositions(selectedStore.Должность);
        } else {
            setPositions([]);
        }
        setSchedules([]);
        form.setFieldsValue({position: undefined, workSchedule: undefined});
    };

    /** Обрабатывает выбор должности, обновляя графики работы */
    const handlePositionChange = (positionName: string) => {
        const selectedPosition = positions.find(
            (position) => position.Наименование === positionName
        );

        if (selectedPosition) {
            setSchedules(selectedPosition.ВозможныеГрафики);
        } else {
            setSchedules([]);
        }

        form.setFieldsValue({workSchedule: undefined});
    };

    /** Обрабатывает отправку формы */
    const handleFinish = async (values: Record<string, any>) => {
        try {
            setLoading(true);
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key === "files") {
                    values.files?.forEach((file) => {
                        formData.append("files", file.originFileObj);
                    });
                } else {
                    formData.append(key, values[key]);
                }
            });

            await axios.post("http://localhost:5000/send", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            notification.success({
                message: "Форма успешно отправлена!",
            });

            form.resetFields();

        } catch (error) {

            notification.error({
                message: "Ошибка",
                description: "Не удалось отправить форму. Попробуйте снова.",
            });
        } finally {
            setLoading(false);
        }
    };

    /** Проверяет файл на тип и размер перед загрузкой */
    const validateFile = (file: File): Promise<void> => {
        const isValidType = ["application/pdf", "image/jpeg", "image/png"].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024;

        if (!isValidType) {
            notification.error({
                message: "Ошибка загрузки файла",
                description: "Недопустимый формат файла. Разрешены только PDF, JPEG и PNG.",
            });
            return Promise.reject(new Error("Недопустимый формат файла."));
        }
        if (!isValidSize) {
            notification.error({
                message: "Ошибка загрузки файла",
                description: "Размер файла превышает 5MB.",
            });
            return Promise.reject(new Error("Размер файла превышает 5MB."));
        }
        return Promise.resolve();
    };

    return <AppView form={form}
                    positions={positions}
                    schedules={schedules}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    loading={loading}
                    handleStoreChange={handleStoreChange}
                    handlePositionChange={handlePositionChange}
                    handleFinish={handleFinish}
                    validateFile={validateFile}/>
};

export default AppServices;
