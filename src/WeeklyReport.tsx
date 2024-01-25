import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {randomColorGenerator} from "./utils/randomColorGenerator";
import {Box, Typography} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

interface WeeklyReportProps {
    categories: Record<string, number>,
    currencyCode: string | null,
}

const getChartColors = (noOfColors: number) => {
    let chartColors = []
    for (let i = 0; i < noOfColors; i += 1) {
        chartColors.push(randomColorGenerator())
    }
    return chartColors
}

export const WeeklyReport = ({categories, currencyCode}: WeeklyReportProps) => {
    const chartColors = getChartColors(Object.keys(categories).length)

    const data = {
        labels: Object.keys(categories),
        datasets: [{
            label: `Amount in ${currencyCode}`,
            data: Object.values(categories),
            backgroundColor: chartColors,
            hoverOffset: 4
        }]
    }

    return <Box id="expenses" sx={{
        p: 4,
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4
    }}>
        <Typography variant={"subtitle1"}>Your weekly expenses visualized</Typography>
        <Doughnut data={data}/></Box>
}