import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IForm } from "../atoms";
import Card from "./Card";

const BoardBox = styled.div`
  max-width: 100%;
  max-height: fit-content;
  margin: 0px 12px;
  padding: 20px;
  background-color: ${(p) => p.theme.BgColor_dim};
`;
const Title = styled.h1`
  font-size: 26px;
`;
const DropedCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap : 8px 0px;
  margin-top: 20px;
  background-color: ${(p) => p.theme.BgColor_sub};
`;

interface IBoadProps {
  data: IForm[];
  title: string;
  index: number;
}

function Board({ data, title, index }: IBoadProps) {
  return (
    <Draggable draggableId={title} index={index}>
      {(props) => (
        <BoardBox
          ref={props.innerRef}
          {...props.dragHandleProps}
          {...props.draggableProps}
        >
          <Title>{title}</Title>
          <Droppable droppableId={title}>
            {(props) => (
              <DropedCards ref={props.innerRef} {...props.droppableProps}>
                {data.map((project, i) => (
                  <Card
                    key={project.id}
                    id={project.id}
                    index={i}
                    title={project.title}
                    requestor={project.requestor}
                    priority={project.priority as string}
                    in_charge={project.in_charge as string}
                  />
                ))}
                {props.placeholder}
              </DropedCards>
            )}
          </Droppable>
        </BoardBox>
      )}
    </Draggable>
  );
}

export default React.memo(Board);
