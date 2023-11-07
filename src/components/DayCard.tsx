import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITodo } from "../atoms";
import styled from "styled-components";

const TodoNote = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.noteBg};
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 2px;
    span {
        line-height: 1.2;
        font-size: 16px;
        font-weight: 600;
        color: ${(props) => props.theme.noteText};
    }
`;

interface IProps {
    todo: ITodo;
    index: number;
}

function DayCard({ todo, index }: IProps) {
    return (
        <Draggable
            key={todo.id}
            draggableId={todo.id + ""}
            index={index}
        >
            {(provided) => (
                <TodoNote
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <span>{todo.text}</span>
                </TodoNote>
            )}
        </Draggable>
    );
}

export default React.memo(DayCard);
