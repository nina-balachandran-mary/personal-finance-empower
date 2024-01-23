import {Account} from "./types/Account";
import {Link} from "react-router-dom";

export interface AccountsProps {
    allAccounts: Account[],
    currencyCode: string,
}

export const Accounts = ({allAccounts, currencyCode}: AccountsProps) => {
    const MAX_DISPLAYED_ACCOUNTS = 10
    return <div>
        <h3>All accounts</h3>
        {allAccounts.map(account => <div key={account.account_id}>
            <Link to={'/transactions/' + account.account_id}>{account.official_name}
                <p>{account.balances.available} {currencyCode}</p></Link></div>)}
        {allAccounts.length > MAX_DISPLAYED_ACCOUNTS && <button>View all ({allAccounts.length})</button>}
    </div>
}