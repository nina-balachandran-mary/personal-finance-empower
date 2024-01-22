export type Transaction = {
    account_id: string,
    account_owner: string | null,
    amount: number,
    iso_currency_code: string | null,
    unofficial_currency_code: string | null,
    category: string[] | null,
    category_id: string | null,
    check_number: string | null,
    counterparties: CounterParty[],
    date: string,
    datetime: string | null,
    authorized_date: string | null,
    authorized_datetime: string | null,
    location: Location,
    name: string,
    merchant_name: string | null,
    merchant_entity_id: string | null,
    logo_url: string | null,
    website: string | null,
    payment_meta: PaymentMeta,
    payment_channel: string,
    pending: boolean,
    pending_transaction_id: string | null,
    personal_finance_category: PersonalFinanceCategory,
    personal_finance_category_icon_url: string,
    transaction_id: string,
    transaction_code: string | null,
    transaction_type: string
}

export type Location = {
    address: string | null,
    city: string | null,
    region: string | null,
    postal_code: string | null,
    country: string | null,
    lat: number | null,
    lon: number | null,
    store_number: string | null,
}

export type PaymentMeta = {
    by_order_of: string | null,
    payee: string | null,
    payer: string | null,
    payment_method: string | null,
    payment_processor: string | null,
    ppd_id: string | null,
    reason: string | null,
    reference_number: string | null
}


export type PersonalFinanceCategory = {
    primary: string
    detailed: string
    confidence_level: string | null
}

export type CounterParty = {
    name: string
    entity_id: string | null
    type: string
    website: string | null
    logo_url: string | null
    confidence_level: string | null

}