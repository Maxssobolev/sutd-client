export interface ModalScheme{
    isShow: boolean;
    type: 'delete' | 'unset';
    confirmationText: string;
    additionalText?: string;
    payload: {
        entityName: 'order' | 'client' | 'abonement';
        entityId: number;
    } | null;
}