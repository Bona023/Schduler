import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";
import DayCard from "./DayCard";

interface ITodoBoxProps {
    $isDraggingOver: boolean;
    $isDraggingFromThisWith: boolean;
}
interface IBoardProps {
    boardId: string;
    toDos: ITodo[];
}

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
    border-bottom: 2px solid ${(props) => props.theme.bodyBg};
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    padding: 5px 0;
`;
const TodoBox = styled.div<ITodoBoxProps>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.$isDraggingOver ? "rgba(224, 86, 253,0.6)" : props.$isDraggingFromThisWith ? "rgba(126, 214, 223,0.8)" : "transparent")};
    padding: 10px 3px;
`;

function WeekBoard({ toDos, boardId }: IBoardProps) {
    return (
        <Droppable droppableId={boardId}>
            {(provided, info) => (
                <Board>
                    <BoardTitle>{boardId}</BoardTitle>
                    <TodoBox
                        $isDraggingOver={info.isDraggingOver}
                        $isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
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
