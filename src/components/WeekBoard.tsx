import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";
import DayCard from "./DayCard";

const Board = styled.div`
    width: 180px;
    height: 300px;
    background-color: ${(props) => props.theme.boardBg};
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-right: 2px;
`;
const BoardTitle = styled.div`
    width: 100%;
    background-color: transparent;
    color: ${(props) => props.theme.boardText};
    border-bottom: 2px solid ${(props) => props.theme.boardText};
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    padding: 5px 0;
`;
const TodoBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
    padding: 10px 3px;
`;

interface IBoardProps {
    boardId: string;
    toDos: ITodo[];
}

function WeekBoard({ toDos, boardId }: IBoardProps) {
    return (
        <Droppable droppableId={boardId}>
            {(provided) => (
                <Board>
                    <BoardTitle>{boardId}</BoardTitle>
                    <TodoBox
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((todo, index) => (
                            <DayCard
                                index={index}
                                todo={todo}
                                key={todo.id}
                            />
                        ))}
                    </TodoBox>
                    {provided.placeholder}
                </Board>
            )}
        </Droppable>
    );
}

export default WeekBoard;
