import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dataAtom } from "../atoms";
import Board from "./Board";
import Trash from "./Trash";

const BoardWrap = styled.div`
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px 0px;
`;

function LeaderBoard() {
  const [data, setData] = useRecoilState(dataAtom);
  const onDragEnd = (props: DropResult) => {
    console.log(props);
    const {
      destination,
      source: { droppableId, index },
      type,
    } = props;
    if (!destination) return;
    if (type === "LeadrBoard") {
      setData((data) => {
        const entries = Object.entries(data);
        const [item] = entries.splice(index, 1);
        entries.splice(destination.index, 0, item);
        return entries.reduce(
          (rest, [key, arr]) => ({ ...rest, [key]: arr }),
          {}
        );
      });
    } else {
      if (destination.droppableId === droppableId) {
        setData((data) => {
          const currentBoard = [...data[droppableId]];
          const item = currentBoard[index];
          currentBoard.splice(index, 1);
          currentBoard.splice(destination.index, 0, item);
          return { ...data, [droppableId]: currentBoard };
        });
      } else if (destination.droppableId === "trash") {
        setData((data) => {
          const currentBoard = [...data[droppableId]];
          currentBoard.splice(index, 1);
          return {
            ...data,
            [droppableId]: currentBoard,
          };
        });
      } else if (destination.droppableId !== droppableId) {
        setData((data) => {
          const currentBoard = [...data[droppableId]];
          const targetBoard = [...data[destination.droppableId]];
          const item = currentBoard[index];
          currentBoard.splice(index, 1);
          targetBoard.splice(destination.index, 0, item);
          return {
            ...data,
            [droppableId]: currentBoard,
            [destination.droppableId]: targetBoard,
          };
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type="LeadrBoard"
        droppableId="LeadrBoard"
        direction="horizontal"
      >
        {(props) => (
          <BoardWrap ref={props.innerRef} {...props.droppableProps}>
            {Object.keys(data).map((key, index) => (
              <Board key={key} data={data[key]} title={key} index={index} />
            ))}
            {props.placeholder}
          </BoardWrap>
        )}
      </Droppable>
      <Trash />
    </DragDropContext>
  );
}

export default React.memo(LeaderBoard);
