import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import WeeklyScheduler from "./screen/WeeklyScheduler";
import Home from "./screen/Home";
import NotFound from "./screen/NotFound";
import TodayScheduler from "./screen/TodayScheduler";
import MonthlyScheduler from "./screen/MonthlyScheduler";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <NotFound />,
            },
            {
                path: "today",
                element: <TodayScheduler />,
                errorElement: <NotFound />,
            },
            {
                path: "weekly",
                element: <WeeklyScheduler />,
                errorElement: <NotFound />,
            },
            {
                path: "monthly",
                element: <MonthlyScheduler />,
                errorElement: <NotFound />,
            },
        ],
        errorElement: <NotFound />,
    },
]);

export default router;
