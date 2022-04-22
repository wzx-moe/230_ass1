import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function VolcanoBar(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Population Density',
            },
        },
    };
    const volcano = props.volcano;
    const data = {
        labels: ['population_5km', 'population_10km', 'population_30km', 'population_100km'],
        datasets: [
            {
                label: 'Population Density',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgb(156,78,95)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [volcano.population_5km, volcano.population_10km, volcano.population_30km, volcano.population_100km],
            }
        ]
    };
    return (
        <div className="pt-4" style={{width: '100%', height: '100%'}}>
            <Bar options={options} data={data}/>
        </div>
    )
}