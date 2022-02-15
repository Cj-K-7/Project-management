import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const BoardBox = styled.div`
  max-width: 100%;
  max-height: fit-content;
  padding: 20px;
  background-color: ${(p) => p.theme.BgColor_dim};
`;
const Title = styled.h1`
  font-size: 26px;
`;

interface IBoadProps {
  title: string;
  index: number;
}

function Board({ title, index }: IBoadProps) {
  return (
    <Draggable draggableId={title} index={index}>
      {(props) => (
          <BoardBox
          ref={props.innerRef}
          {...props.dragHandleProps}
          {...props.draggableProps}
          >
            <Title>{title}</Title>
        </BoardBox>
      )}
    </Draggable>
  );
}

export default Board;
