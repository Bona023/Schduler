import styled from "styled-components";
import { Container, Title } from "./WeeklyScheduler";
import ReactApexChart from "react-apexcharts";
import { worksCheck } from "../atoms";
import { Helmet } from "react-helmet";

const TodayArea = styled.div`
    width: 1200px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
`;

const timeTable = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];

function TodayScheduler() {
    return (
        <>
            <Helmet>
                <title>Today</title>
            </Helmet>
            <Container>
                <Title>Today Scheduler</Title>
                <TodayArea></TodayArea>
            </Container>
        </>
    );
}

export default TodayScheduler;
