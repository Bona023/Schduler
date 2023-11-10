import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const modeState = atom({
    key: "themeMode",
    default: false,
});

// weekly
export interface ITodo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
    key: "weeklyToDos",
    default: {
        Sun: [],
        Mon: [],
        Tue: [],
        Wen: [],
        Thu: [],
        Fri: [],
        Sat: [],
    },
    effects_UNSTABLE: [persistAtom],
});

// today
export const worksCheck = [
    {
        name: "lunch",
        data: [0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        name: "workout",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0],
    },
];

// monthly
interface IMonthlyState {
    x: string;
    y: number[];
    fillColor: string;
}

export const monthlyState = atom({
    key: "MonthlyData",
    default: [
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
    ],
});
