import {LinearProgress, linearProgressClasses, styled, Box, Typography} from "@mui/material";

interface TrackerProgressProps {
    value: number
}

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));


export const TrackerProgress = ({value}: TrackerProgressProps) => {
    return (
        <Box display="flex" alignItems="center" p={3}>
            <Box width="100%" mr={3}>
                <BorderLinearProgress variant="determinate" value={value}/>
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
