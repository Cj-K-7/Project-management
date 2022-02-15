import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dataAtom } from "../atoms";
import Board from "./Board";

const Container = styled.div`
  margin: 16px;
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

function LeaderBoard() {
  const [data, setData] = useRecoilState(dataAtom);
  const onDragEnd = (props: DropResult) => {
    console.log(props);
    const {
      destination,
      source: { droppableId, index },
    } = props;
    if (!destination) return;
    if (destination.droppableId === droppableId) {
      setData((data) => {
        const entries = Object.entries(data);
        const [item] = entries.splice(index, 1);
        entries.splice(destination.index, 0, item);
        return entries.reduce(
          (rest, [key, arr]) => ({ ...rest, [key]: arr }),
          {}
        );
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="LeadrBoard" direction="horizontal">
        {(props) => (
          <Container ref={props.innerRef} {...props.droppableProps}>
            {Object.keys(data).map((key, index) => (
              <Board key={key} title={key} index={index} />
            ))}
            {props.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default LeaderBoard;
