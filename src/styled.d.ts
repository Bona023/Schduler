import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bodyBg: string;
        titleText: string;
        accentColor: string;
        border: string;
        btnBg: string;
        btnText: string;
        btnBgRev: string;
        btnTextRev: string;
        error: string;
        boardBg: string;
        boardText: string;
        noteBg: string;
        noteText: string;
    }
}
