import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useRecoilValue } from "recoil";
import { modeState } from "./atoms";

const GlobalStyle = createGlobalStyle`  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  *{font-family:'Gamja Flower', sans-serif;}
  body {
    line-height: 1;
    font-family:'Gamja Flower', sans-serif;
    background-color: ${(props) => props.theme.bodyBg};
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body{
  }
  a{
    text-decoration: none;
  }
  select{
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
`;

function Root() {
    const isDark = useRecoilValue(modeState);
    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Roboto+Mono:wght@500&display=swap"
                    rel="stylesheet"
                ></link>
            </Helmet>
            <GlobalStyle />
            <Header />
            <Outlet />
        </ThemeProvider>
    );
}

export default Root;
