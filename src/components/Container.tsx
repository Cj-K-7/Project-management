import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dataAtom, IDataAtom } from "../atoms";
import Form from "./Form";
import LeaderBoard from "./LeaderBoard";

const Window = styled.div`
  padding: 20px;
  overflow: hidden;
`;

function Container() {
  const setData = useSetRecoilState(dataAtom);
  const [value, setValue] = useState("");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData((pre)=>{
      return {...pre, [value] : []}
    })
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget : {value},
    } = event;
    setValue(value);
  };

  return (
    <Window>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" />
      </form>
      <LeaderBoard />
      <Form />
    </Window>
  );
}

export default Container;
