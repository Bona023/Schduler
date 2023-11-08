import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <div>
        <RecoilRoot>
            <ThemeProvider theme={lightTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </RecoilRoot>
    </div>
);
