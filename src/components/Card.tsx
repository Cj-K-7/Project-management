import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardBox = styled.div<{isDragging: boolean}>`
  padding : 10px 12px;
  display: flex;
  justify-content: space-between;
  background-color: ${props=>props.theme.BgColor_bold};
  ${p=>p.isDragging&& `background-color:${p.theme.hoverColor}`}
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: end;
`;
const Left = styled.div`
  text-align: start;
  margin-right: 12px;
`;
const Priority = styled.div`
  font-size: 12px;
`;
const Title = styled.div`
  font-size: 20px;
`;
const Requestor = styled.div`
  font-size: 12px;
`;
const InCharge = styled.div`
    font-size: 16px;
`;

interface ICardProps {
  id: number;
  title: string;
  requestor: string;
  priority: string;
  in_charge: string;
  index: number;
}

function Card({
  id,
  title,
  requestor,
  priority,
  in_charge,
  index,
}: ICardProps) {
  return (
    <Draggable draggableId={id+""} index={index}>
      {(props, snapshot) => (
        <CardBox isDragging={snapshot.isDragging} ref={props.innerRef} {...props.dragHandleProps}{...props.draggableProps}>
          <Left>
            <Priority>{priority}</Priority>
            <Title>{title}</Title>
          </Left>
          <Right>
            <InCharge>{in_charge}</InCharge>
            <Requestor>{requestor}</Requestor>
          </Right>
        </CardBox>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
