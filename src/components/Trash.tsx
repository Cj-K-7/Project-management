import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const DeleteUI = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  border-radius: 50%;
  box-shadow: 4px 4px 6px rgba(255, 150, 150, 0.15) inset;
  &::after {
    position: absolute;
    content: "";
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 3px 3px 5px rgba(60, 15, 15, 0.8);
  }
  &:hover {
    background-color: rgba(255, 100, 100, 0.8);
    box-shadow: 4px 4px 6px rgba(255, 255, 255, 0.3) inset;
  }
  background-color: rgba(255, 100, 100, 0.1);
`;

function Trash() {
  return (
    <Droppable droppableId="trash">
      {(props) => (
        <DeleteUI ref={props.innerRef} {...props.droppableProps}>
          DELETE
          {props.placeholder}
        </DeleteUI>
      )}
    </Droppable>
  );
}

export default Trash;
