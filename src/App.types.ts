/**
 * Пропсы для компонента App View.
 */
export type TAppViewProps = {
    /** Объект формы с состоянием и методами. */
    form: TForm;
    /** Список доступных должностей для выбранного магазина. */
    positions: any[];
    /** Список доступных графиков работы для выбранной должности. */
    schedules: any[];
    /** Флаг отображения модального окна. */
    isModalVisible: boolean;
    /** Функция для изменения состояния видимости модального окна. */
    setIsModalVisible: (visible: boolean) => void;
    /** Флаг загрузки. */
    loading: boolean;
    /** Функция обработки выбора магазина. */
    handleStoreChange: (storeCode: string) => void;
    /** Функция обработки выбора должности. */
    handlePositionChange: (positionName: string) => void;
    /** Функция обработки отправки формы. */
    handleFinish: (values: Record<string, any>) => void;
    /** Функция проверки загружаемого файла. */
    validateFile: (file: File) => Promise<void>;
};

/**
 * Тип данных формы.
 */
type TForm = {
    /** Код выбранного магазина. */
    store?: string;
    /** Название выбранной должности. */
    position?: string;
    /** Выбранный график работы. */
    workSchedule?: string;
    /** Комментарий. */
    comment?: string;
    /** Список загружаемых файлов. */
    files?: File[];
    /** Предпочтительный способ связи. */
    preferredContactMethod?: string;
    /** Согласие с политикой обработки персональных данных. */
    agreement?: boolean;
};
