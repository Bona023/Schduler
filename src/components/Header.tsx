import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modeState } from "../atoms";

const NavBox = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LinkBar = styled.div`
    width: 750px;
    height: 100%;
    display: flex;
    padding-top: 20px;
    padding-left: 30px;
    justify-content: start;
    align-items: center;
`;
const ModeBtn = styled(motion.button)`
    width: 80px;
    height: 40px;
    background-color: ${(props) => props.theme.btnBgRev};
    color: ${(props) => props.theme.btnTextRev};
    border: none;
    border-radius: 20px;
    font-size: 22px;
    font-weight: 500;
    box-shadow: 2px 2px 4px #718093;
    &:hover {
        cursor: pointer;
    }
`;
const LinkBox = styled.div`
    padding: 3px 10px;
    margin-right: 10px;
    border-bottom: 3px solid ${(props) => props.theme.titleText};
    &:hover {
        border-bottom: 3px solid ${(props) => props.theme.accentColor};
        transition: all 2s ease-in-out;
    }
`;
const StyledLink = styled(Link)`
    color: ${(props) => props.theme.titleText};
    font-size: 24px;
    font-weight: 600;
    &:hover,
    &:active,
    &:focus {
        cursor: pointer;
        color: ${(props) => props.theme.accentColor};
    }
`;

function Header() {
    const [isDark, setIsDark] = useRecoilState(modeState);
    const modeChange = () => setIsDark((prev) => !prev);
    return (
        <NavBox>
            <LinkBar>
                <LinkBox>
                    <StyledLink to={"today"}>Today</StyledLink>
                </LinkBox>
                <LinkBox>
                    <StyledLink to={"weekly"}>Weekly</StyledLink>
                </LinkBox>
                <LinkBox>
                    <StyledLink to={"monthly"}>Monthly</StyledLink>
                </LinkBox>
            </LinkBar>
            <ModeBtn
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={modeChange}
            >
                {isDark ? "Light" : "Dark"}
            </ModeBtn>
        </NavBox>
    );
}
export default Header;
