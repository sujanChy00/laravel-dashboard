import { OverAllStatusChart } from "@/components/over-all-status-chart";
import { StatusChart } from "@/components/status-chart";
import { ChartConfig } from "@/components/ui/chart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { IChart } from "@/types/IHome";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

export default function Dashboard({
    totalUsers,
    projects,
    tasks,
}: {
    totalUsers: number;
    projects: IChart;
    tasks: IChart;
}) {
    return (
        <>
            <Head title="Dashboard" />
            <header className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center justify-between">
                <StatusChart
                    dataKey="users"
                    nameKey="users"
                    chartConfig={{
                        users: {
                            label: "users",
                            color: "var(--color-safari)",
                        },
                    }}
                    chartData={[
                        {
                            users: totalUsers,
                            fill: "hsl(var(--chart-2))",
                        },
                    ]}
                    total={totalUsers}
                    label="Total Users"
                    type="radial"
                />
                <StatusChart
                    total={projects.total}
                    chartConfig={
                        {
                            count: {
                                label: "count",
                            },
                            ...projects.chartConfig,
                        } as ChartConfig
                    }
                    dataKey="count"
                    nameKey="status"
                    chartData={projects.chartData}
                    label="Projects"
                    type="pie"
                />
                <StatusChart
                    total={tasks.total}
                    chartConfig={
                        {
                            count: {
                                label: "count",
                            },
                            ...tasks.chartConfig,
                        } as ChartConfig
                    }
                    dataKey="count"
                    nameKey="status"
                    chartData={tasks.chartData}
                    label="Tasks"
                    type="pie"
                />
            </header>
            <OverAllStatusChart />
        </>
    );
}

Dashboard.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);
