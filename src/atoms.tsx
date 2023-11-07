import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ITodo {
    id: number;
    text: string;
}

type IToDoState = {
    [key: string]: ITodo[];
};

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
