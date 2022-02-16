import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dataAtom, formToggleAtom } from "../atoms";
import Form from "./Form";
import LeaderBoard from "./LeaderBoard";

const Window = styled.div`
  padding: 20px;
  overflow: hidden;
`;

const CategoryCreater = styled.form`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 30px;
  left: 30px;
  input{
    padding : 20px 16px;
  }
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

function Container() {
  const setData = useSetRecoilState(dataAtom);
  const [toggle, setToggle] = useRecoilState(formToggleAtom);
  const [value, setValue] = useState("");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData((pre) => {
      return { ...pre, [value]: [] };
    });
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  return (
    <Window>
      <CategoryCreater onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Add New Category"
        />
        <input type="submit" value="SUBMIT" />
      </CategoryCreater>
      <LeaderBoard />
      <Toggle onClick={() => setToggle((b) => !b)}>
        {toggle ? "CLOSE" : "NEW"}
      </Toggle>
      {toggle ? <Form /> : null}
    </Window>
  );
}

export default Container;
