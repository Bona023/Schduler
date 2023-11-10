import styled from "styled-components";
import { Container, Title } from "./WeeklyScheduler";
import { useNavigate } from "react-router-dom";
import weeklyImg from "../image/weeklyScreen.png";
import { Helmet } from "react-helmet";

const ChoiceBox = styled.div`
    width: 800px;
    height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const LinkBox = styled.div`
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LinkTitle = styled.h1`
    color: ${(props) => props.theme.titleText};
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
`;
const ImgBox = styled.div<{ imgurl?: string }>`
    width: 100%;
    height: 200px;
    text-align: center;
    font-size: 25px;
    color: ${(props) => props.theme.boardText};
    border: 2px solid ${(props) => props.theme.titleText};
    border-radius: 20px;
    background-image: url(${(props) => (props.imgurl ? props.imgurl : "")});
    background-color: ${(props) => (props.imgurl ? null : props.theme.boardBg)};
    background-position: center;
    background-size: cover;
    &:hover {
        cursor: pointer;
        scale: 1.2;
        transition: all 0.5s;
    }
`;

function Home() {
    const navigate = useNavigate();
    const goWeekly = () => {
        navigate("/weekly");
    };
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Container>
                <Title>스케줄러를 선택해 주세요!</Title>
                <ChoiceBox>
                    <LinkBox>
                        <LinkTitle>Today</LinkTitle>
                        <ImgBox>ComingSoon</ImgBox>
                    </LinkBox>
                    <LinkBox onClick={goWeekly}>
                        <LinkTitle>Weekly</LinkTitle>
                        <ImgBox imgurl={weeklyImg}></ImgBox>
                    </LinkBox>
                    <LinkBox>
                        <LinkTitle>Monthly</LinkTitle>
                        <ImgBox>ComingSoon</ImgBox>
                    </LinkBox>
                </ChoiceBox>
            </Container>
        </>
    );
}

export default Home;
