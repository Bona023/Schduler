import { useRecoilState } from "recoil";
import { monthlyState } from "../atoms";
import { Container, Title } from "./WeeklyScheduler";
import ReactApexChart from "react-apexcharts";
import { Helmet } from "react-helmet";

const MData = [
    {
        x: "Work1",
        y: [new Date("2023-10-27").getTime(), new Date("2023-11-04").getTime()],
        fillColor: "#008FFB",
    },
    {
        x: "Work2",
        y: [new Date("2023-11-04").getTime(), new Date("2023-11-08").getTime()],
        fillColor: "#00E396",
    },
    {
        x: "Work3",
        y: [new Date("2023-11-07").getTime(), new Date("2023-11-10").getTime()],
        fillColor: "#775DD0",
    },
    {
        x: "Work4",
        y: [new Date("2023-11-08").getTime(), new Date("2023-11-12").getTime()],
        fillColor: "#FEB019",
    },
    {
        x: "Work5",
        y: [new Date("2023-11-12").getTime(), new Date("2023-11-17").getTime()],
        fillColor: "#FF4560",
    },
];

function MonthlyScheduler() {
    return (
        <>
            <Helmet>
                <title>Monthly</title>
            </Helmet>
            <Container>
                <Title>Monthly Scheduler</Title>
                <ReactApexChart
                    type="rangeBar"
                    width={1000}
                    height={500}
                    series={[
                        {
                            data: MData,
                        },
                    ]}
                    options={{
                        chart: { toolbar: { show: false } },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                                distributed: true,
                                dataLabels: {
                                    hideOverflowingLabels: false,
                                },
                            },
                        },
                        dataLabels: {
                            enabled: true,
                            formatter: function (val, opts) {
                                var label = opts.w.globals.labels[opts.dataPointIndex];
                                return label;
                            },
                            style: {
                                colors: ["#f3f4f5", "#fff"],
                            },
                        },
                        xaxis: {
                            type: "datetime",
                        },
                        yaxis: {
                            show: false,
                        },
                        grid: {
                            row: {
                                colors: ["#f3f4f5", "#fff"],
                                opacity: 1,
                            },
                        },
                    }}
                />
            </Container>
        </>
    );
}

export default MonthlyScheduler;
