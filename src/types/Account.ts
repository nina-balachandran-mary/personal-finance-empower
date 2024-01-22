export type Account = {
    account_id: string,
    balances: Balance,
    mask: string | null,
    name: string,
    official_name: string | null,
    subtype: string | null,
    type: string
}

export type Balance = {
    available: number | null,
    current: number | null,
    iso_currency_code: string | null,
    limit: number | null,
    unofficial_currency_code: string | null,
    last_updated_datetime: string | null
}