export interface IChart {
    total: number;
    chartData: IChartData[];
    chartConfig: IChartConfig;
}

export interface IChartData {
    status: string;
    count: number;
    fill: string;
}

export interface IChartConfig {
    label: string;
    fill: string;
}
