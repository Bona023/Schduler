import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";
import DayCard from "./DayCard";

const Board = styled.div`
    width: 160px;
    height: 270px;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;
const BoardTitle = styled.div`
    width: 100%;
    background-color: yellow;
    text-align: center;
    font-size: 16px;
    padding: 5px 0;
`;
const TodoUl = styled.ul`
    width: 100%;
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
                    <TodoUl
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
                    </TodoUl>
                    {provided.placeholder}
                </Board>
            )}
        </Droppable>
    );
}

export default WeekBoard;
