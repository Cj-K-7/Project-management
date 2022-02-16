import styled from "styled-components";

export const FormBox = styled.div`
  position : absolute;
  max-width: 800px;
  bottom:20px;
  right:140px;
  opacity : 0.8;
  background-color: ${(props) => props.theme.BgColor_bold};
`;

export const FormDoc = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  input:focus {
    outline: ${(props) => props.theme.alertColor} solid 2px;
  }
`;
export const Title = styled.h1`
  padding: 20px 0px 0px 20px;
  font-size: 32px;
`;
export const GridSystem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr) 3fr;
  grid-gap: 12px 18px;
`;
export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Grid_TA = styled.div`
  grid-area: 3/1/4/3;
  display: flex;
  flex-direction: column;
`;
export const Subtitle = styled.h2`
  font-size: 24px;
  margin: 12px 5px;
`;
export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin: 8px 5px;
`;
export const Notice = styled.div`
  align-self: flex-end;
  font-size: 11px;
  color: ${(props) => props.theme.alertColor};
`;
export const RequestTitleInput = styled.input.attrs({
  type: "text",
})``;
export const RequestorInput = styled.input.attrs({
  type: "text",
})``;
export const Select = styled.select``;
export const TextArea = styled.textarea`
  height: 100%;
  border: none;
  resize: none;
`;
export const Btn = styled.input.attrs({
  type: "submit",
})`
  width: fit-content;
  align-self: flex-end;
  padding: 10px 16px;
  margin-top: 28px;
`;
