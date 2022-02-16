import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState} from "recoil";
import styled from "styled-components";
import { dataAtom, formToggleAtom } from "../atoms";
import Board from "./Board";
import Trash from "./Trash";

const Container = styled.div`
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap : 16px 0px;
`;
const Toggle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  bottom: 120px;
  right: 40px;
  border-radius: 50%;
  box-shadow: 4px 4px 6px rgba(150, 150, 250, 0.15) inset;
  &::after {
    position: absolute;
    content: "";
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 3px 3px 5px rgba(60, 15, 15, 0.8);
  }
  &:hover {
    background-color: rgba(100, 100, 255, 0.8);
    box-shadow: 4px 4px 6px rgba(255, 255, 255, 0.3) inset;
  }
  background-color: rgba(100, 100, 255, 0.1);
`;

function LeaderBoard() {
  const [data, setData] = useRecoilState(dataAtom);
  const [toggle, setToggle] = useRecoilState(formToggleAtom);
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
            [droppableId]: currentBoard
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
      <Trash />
      <Droppable
        type="LeadrBoard"
        droppableId="LeadrBoard"
        direction="horizontal"
      >
        {(props) => (
          <Container ref={props.innerRef} {...props.droppableProps}>
            {Object.keys(data).map((key, index) => (
              <Board key={key} data={data[key]} title={key} index={index} />
            ))}
            {props.placeholder}
          </Container>
        )}
      </Droppable>
      <Toggle onClick={()=>setToggle((b)=>!b)}>{toggle ? "CLOSE" : "NEW"}</Toggle>
    </DragDropContext>
  );
}

export default React.memo(LeaderBoard);
