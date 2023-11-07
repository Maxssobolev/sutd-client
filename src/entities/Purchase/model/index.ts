export interface Purchase {
    purchase_startdate: string | null,
    purchase_enddate: string | null,
    purchase_paymentmethod: string | null,
    purchase_ispaid: boolean,
    purchase_abonement_id: number | null,
}