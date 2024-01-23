import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {randomColorGenerator} from "./utils/randomColorGenerator";

ChartJS.register(ArcElement, Tooltip, Legend);

interface WeeklyReportProps {
    categories: Record<string, number>,
    currency: string | null,
}

const getChartColors = (noOfColors: number) => {
    let chartColors = []
    for (let i = 0; i < noOfColors; i += 1) {
        chartColors.push(randomColorGenerator())
    }
    return chartColors
}

export const WeeklyReport = ({categories, currency}: WeeklyReportProps) => {
    const chartColors = getChartColors(Object.keys(categories).length)

    const data = {
        labels: Object.keys(categories),
        datasets: [{
            label: `Amount in ${currency}`,
            data: Object.values(categories),
            backgroundColor: chartColors,
            hoverOffset: 4
        }]
    }

    return <div id="expenses"><Doughnut data={data}/></div>
}