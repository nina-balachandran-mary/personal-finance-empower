import {Box, Typography} from "@mui/material";

export interface AccountsSummaryProps {
    totalBalance: number
    currencyCode: string
}

const headerColor = '#32a852'
export const AccountsSummary = ({totalBalance, currencyCode}: AccountsSummaryProps) => {
    return <Box
        sx={{
            p: 2,
            borderRadius: 2,
            border: `1px solid ${headerColor}`,
            color: 'white',
            bgcolor: headerColor
        }}><Typography
        variant={'subtitle1'}>Total Balance</Typography><Typography
        variant={"h4"}>{totalBalance} {currencyCode}</Typography></Box>
}