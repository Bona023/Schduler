import styled from "styled-components";
import errorImg from "../image/error404.png";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ErrorPage = styled.img`
    width: 800px;
    height: 600px;
    display: block;
`;

function NotFound() {
    return (
        <Wrapper>
            <ErrorPage
                src={errorImg}
                alt="404_ERROR"
            />
        </Wrapper>
    );
}

export default NotFound;
