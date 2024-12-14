import styles from "./App.module.css"
import LionLogo from "../public/logo.jpg"
import {Form, Input, Select, Button, Upload, notification, Checkbox, Spin} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import {
    contactMethodOptions,
    sourceOptions,
} from "./assets/config/list.config.ts";

const {TextArea} = Input;

import data from "./assets/config/data.json"
import PrivacyPolicyModal from "./components/Modal.tsx";
import type {TAppViewProps} from "./App.types.ts";

const AppView: React.FC<TAppViewProps> = (props) => {
    return (
        <div className={styles.wrapper}>
            {props.loading && (
                <div className={styles.loader}>
                    <Spin size="large"/>
                </div>
            )}
            <div className={styles.container}>
                <img src={LionLogo} alt="LionLogo"/>

                <Form
                    form={props.form}
                    layout="vertical"
                    onFinish={props.handleFinish}
                    initialValues={{preferredContactMethod: "Телефон"}}
                >
                    <Form.Item
                        label="ФИО"
                        name="fullName"
                        rules={[{required: true, message: "Пожалуйста, введите ФИО!"}]}
                    >
                        <Input size="large" placeholder="Введите ваше ФИО"/>
                    </Form.Item>

                    <Form.Item
                        label="Телефон"
                        name="phone"
                        rules={[{required: true, message: "Пожалуйста, введите телефон!"}]}
                    >
                        <MaskedInput size="large" mask="+7 (000) 000-00-00" placeholder="+7 (___) ___-__-__"/>
                    </Form.Item>

                    <Form.Item
                        label="Магазин"
                        name="store"
                        rules={[{required: true, message: "Пожалуйста, выберите магазин!"}]}
                    >
                        <Select placeholder="Выберите магазин"
                                showSearch
                                filterOption={(input, option) =>
                                    option?.children.toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={props.handleStoreChange}>
                            {data.Результат.map((store) => (
                                <Select.Option key={store.КодМагазина} value={store.Наименование}>
                                    {store.Наименование}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Должность"
                        name="position"
                        rules={[{required: true, message: "Пожалуйста, выберите должность!"}]}
                    >
                        <Select placeholder="Выберите должность" onChange={props.handlePositionChange}
                                disabled={!props.positions.length}>
                            {props.positions.map((position) => (
                                <Select.Option key={position.Наименование} value={position.Наименование}>
                                    {position.Наименование}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="График работы"
                        name="workSchedule"
                        rules={[{required: true, message: "Пожалуйста, выберите график работы!"}]}
                    >
                        <Select placeholder="Выберите график" disabled={!props.schedules.length}>
                            {props.schedules.map((schedule, index) => (
                                <Select.Option key={index} value={schedule}>
                                    {schedule}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Желаемый график работы" name="desiredSchedule">
                        <Input size="large" placeholder="5/2, 2/2"/>
                    </Form.Item>

                    <Form.Item
                        label="Откуда пришли?"
                        name="source"
                        rules={[{required: true, message: "Пожалуйста, выберите источник!"}]}
                    >
                        <Select size="large" placeholder="Выберите источник">
                            {sourceOptions.map((option) => (
                                <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Предпочтительный способ связи"
                        name="preferredContactMethod"
                        rules={[{required: true, message: "Пожалуйста, выберите способ связи!"}]}
                    >
                        <Select placeholder="Выберите способ связи" size="large" onChange={props.handleContactMethodChange}>
                            {contactMethodOptions.map((option) => (
                                <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {props.isEmailSelected && (
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Пожалуйста, введите ваш email!" },
                                { type: "email", message: "Введите корректный email!" },
                            ]}
                        >
                            <Input placeholder="Введите ваш email" size="large" />
                        </Form.Item>
                    )}

                    <Form.Item label="Комментарий" name="comment">
                        <TextArea size="large" placeholder="Введите комментарий" rows={4}/>
                    </Form.Item>

                    <Form.Item
                        label="Загрузка файлов"
                        name="files"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload.Dragger
                            name="files"
                            multiple
                            maxCount={5}
                            beforeUpload={props.validateFile}
                            accept=".pdf,.jpeg,.jpg,.png,.heif,.heic"
                            customRequest={({file, onSuccess, onError}) => {
                                setTimeout(() => {
                                    onSuccess && onSuccess("ok");
                                }, 1000);
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Нажмите или перетащите файлы в эту область для загрузки</p>
                            <p className="ant-upload-hint">
                                Максимум 5 файлов, размером до 5MB, форматы: PDF, JPEG, PNG.
                            </p>
                        </Upload.Dragger>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        className={styles.checkbox}
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(new Error("Вы должны согласиться с политикой конфиденциальности!")),
                            },
                        ]}
                    >
                        <Checkbox>
                            Я согласен с <a className={styles.policy} onClick={() => props.setIsModalVisible(true)}>условиями
                            обработки персональных данных.</a>
                        </Checkbox>
                    </Form.Item>


                    <Form.Item>
                        <Button className={styles.main__button} size="large" type="primary" htmlType="submit">
                            Отправить
                        </Button>
                    </Form.Item>
                </Form>

                <PrivacyPolicyModal
                    visible={props.isModalVisible}
                    onClose={() => props.setIsModalVisible(false)}
                />
            </div>
        </div>
    )
}

export default AppView
