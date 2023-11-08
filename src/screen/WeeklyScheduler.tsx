import React from "react";
import { styled } from "styled-components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import WeekBoard from "../components/WeekBoard";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import trashBinImg from "../image/trashbin.png";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const Title = styled.h1`
    font-size: 50px;
    font-weight: 700;
    text-shadow: 1px 1px 3px #636e72;
    margin: 20px 0;
    color: ${(props) => props.theme.titleText};
`;
const Weekly = styled.div`
    width: 1300px;
    height: 400px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: start;
`;
const FormBox = styled.div`
    width: 1100px;
    display: flex;
    justify-content: end;
    align-items: center;
`;
const TrashBin = styled.div`
    width: 80px;
    height: 80px;
    margin-left: 150px;
    text-align: center;
    padding-top: 15px;
`;
const Form = styled.form`
    width: 600px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
`;
const FormSpan = styled.span`
    color: ${(props) => props.theme.titleText};
`;
const DaySelect = styled.select`
    width: 80px;
    height: 35px;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin-right: 5px;
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.border};
    border-radius: 10px;
    color: ${(props) => props.theme.titleText};
    &:hover {
        cursor: pointer;
        border: 2px solid ${(props) => props.theme.accentColor};
        transition: all 2s;
    }
    &:focus {
        outline: none;
    }
`;
const DayOption = styled.option`
    background-color: #636e72;
    color: #dfe6e9;
`;
const ToDoInput = styled.input`
    width: 230px;
    padding-left: 10px;
    margin: 0 15px;
    background-color: transparent;
    color: ${(props) => props.theme.titleText};
    border: none;
    font-size: 24px;
    border-bottom: 2px solid ${(props) => props.theme.border};
    &:focus {
        outline: none;
        border-bottom: 2px solid ${(props) => props.theme.accentColor};
        transition: all 2s;
    }
    &::placeholder {
        color: #808e9b;
    }
`;
const AddBtn = styled(motion.button)`
    width: 55px;
    height: 32px;
    padding: 3px 0;
    line-height: 1;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 600;
    background-color: ${(props) => props.theme.btnBg};
    color: ${(props) => props.theme.btnText};
    box-shadow: 2px 2px 5px #7f8fa6;
    &:hover {
        cursor: pointer;
    }
`;
const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ErrorMsg = styled.span`
    color: ${(props) => props.theme.error};
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
`;
const DelMsg = styled.span`
    color: ${(props) => props.theme.titleText};
    font-size: 20px;
    font-weight: 500;
    margin-left: 800px;
    margin-top: 15px;
`;

interface IToDoForm {
    day: string;
    todoText: string;
    id: number;
}

function WeeklyScheduler() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IToDoForm>();
    const dragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;
        if (destination?.droppableId === "delete") {
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                sourceBoard.splice(source.index, 1);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                };
            });
        }
        if (destination?.droppableId === source.droppableId) {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const toDoObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, toDoObj);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination?.droppableId !== source.droppableId && destination?.droppableId !== "delete") {
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const toDoObj = sourceBoard[source.index];
                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination.index, 0, toDoObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }
    };
    const onValid = ({ day, todoText }: IToDoForm) => {
        const newObj = {
            id: Date.now(),
            text: todoText,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [day]: [newObj, ...allBoards[day]],
            };
        });
        setValue("todoText", "");
    };
    return (
        <Container>
            <Title>Weekly Scheduler</Title>
            <DragDropContext onDragEnd={dragEnd}>
                <FormBox>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <DaySelect {...register("day")}>
                            <DayOption value="Sun">일요일</DayOption>
                            <DayOption value="Mon">월요일</DayOption>
                            <DayOption value="Tue">화요일</DayOption>
                            <DayOption value="Wen">수요일</DayOption>
                            <DayOption value="Thu">목요일</DayOption>
                            <DayOption value="Fri">금요일</DayOption>
                            <DayOption value="Sat">토요일</DayOption>
                        </DaySelect>
                        <FormSpan>에 할일 :</FormSpan>
                        <InputBox>
                            <ToDoInput
                                {...register("todoText", { required: "ERROR : 추가할 내용을 적어주세요!" })}
                                placeholder="여기에 적어주세요~"
                                type="text"
                            />
                            <ErrorMsg>{errors?.todoText?.message}</ErrorMsg>
                        </InputBox>
                        <AddBtn
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                        >
                            추가
                        </AddBtn>
                    </Form>
                    <Droppable droppableId="delete">
                        {(provided) => (
                            <TrashBin
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <img
                                    src={trashBinImg}
                                    alt="trashBin"
                                />
                            </TrashBin>
                        )}
                    </Droppable>
                </FormBox>
                <DelMsg>ToDo를 삭제하려면 쓰레기통 이미지 위로 드레그 해주세요!!</DelMsg>
                <Weekly>
                    {Object.keys(toDos).map((boardId) => (
                        <WeekBoard
                            key={boardId}
                            toDos={toDos[boardId]}
                            boardId={boardId}
                        />
                    ))}
                </Weekly>
            </DragDropContext>
        </Container>
    );
}

export default WeeklyScheduler;
