export interface AccountsSummaryProps {
    totalBalance: number
    currencyCode: string
}

export const AccountsSummary = ({totalBalance, currencyCode}: AccountsSummaryProps) => {
    return <div><p>Total Balance</p><h3>{totalBalance} {currencyCode}</h3></div>
}