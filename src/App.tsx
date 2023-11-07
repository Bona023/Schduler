import React from "react";
import { styled, createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import WeekBoard from "./components/WeekBoard";
import { useForm } from "react-hook-form";

const GlobalStyle = createGlobalStyle`  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
    font-family:'Gamja Flower', sans-serif;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body{
  }
  a{
    text-decoration: none;
  }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 50px;
    font-weight: 700;
    margin: 20px 0;
`;
const Weekly = styled.div`
    width: 1200px;
    height: 300px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Form = styled.form`
    width: 1200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IToDoForm {
    day: string;
    todoText: string;
    id: number;
}

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IToDoForm>();
    const dragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;
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
        if (destination?.droppableId !== source.droppableId) {
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
        <>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Roboto+Mono:wght@500&display=swap"
                    rel="stylesheet"
                ></link>
            </Helmet>
            <GlobalStyle />
            <Container>
                <Title>Weekly</Title>
                <Form onSubmit={handleSubmit(onValid)}>
                    <select {...register("day")}>
                        <option value="Sun">일요일</option>
                        <option value="Mon">월요일</option>
                        <option value="Tue">화요일</option>
                        <option value="Wen">수요일</option>
                        <option value="Thu">목요일</option>
                        <option value="Fri">금요일</option>
                        <option value="Sat">토요일</option>
                    </select>
                    <span>에 할일 :</span>
                    <input
                        {...register("todoText", { required: "추가할 내용을 적어주세요!" })}
                        placeholder="저녁 후 산책하기"
                        type="text"
                    />
                    <button>추가</button>
                </Form>
                <DragDropContext onDragEnd={dragEnd}>
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
        </>
    );
}

export default App;
