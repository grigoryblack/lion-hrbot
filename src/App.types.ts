export type AppServicesProps = {
    positions: Array<{ Наименование: string; ВозможныеГрафики: string[] }>;
    schedules: string[];
    handleStoreChange: (storeCode: string) => void;
    handlePositionChange: (positionName: string) => void;
    handleFinish: (values: any) => void;
    validateFile: (file: File) => Promise<void>;
}