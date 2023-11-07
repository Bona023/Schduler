import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITodo } from "../atoms";

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
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {todo.text}
                </li>
            )}
        </Draggable>
    );
}

export default React.memo(DayCard);
