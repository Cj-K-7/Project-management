import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FormBox = styled.div`
  max-width: 600px;
`;
const FormDoc = styled.form`
  display: flex;
  flex-direction: column;
  margin: 16px;
  input:focus{
    outline: ${props=>props.theme.alertColor} solid 2px;
  }
`;
const Title = styled.h1`
  margin: 20px 0px 0px 20px;
  font-size: 32px;
`;
const GridSystem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px 16px;
`;
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Subtitle = styled.h2`
  font-size: 24px;
  margin: 12px 5px;
`;
const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin: 8px 5px;
`;
const Notice = styled.div`
  align-self: flex-end;
  font-size : 11px;
  color: ${props=>props.theme.alertColor};
`;
const RequestTitleInput = styled.input.attrs({
  type: "text",
})``;
const RequestorInput = styled.input.attrs({
  type: "text",
})``;
const Select = styled.select`
`;
const Btn = styled.input.attrs({
  type: "submit",
})`
  padding: 10px 14px;
  margin-top: 28px;
`;

enum Priority {
  TOP = "Top",
  HIGH = "HIGH",
  NORMAL = "Normal",
  LOW = "LOW",
}

enum Departments {
  Service = "Service_Plan",
  FrontEnd = "Front_End",
  BackEnd = "Back_End",
  Design = "Design",
}

interface IForm {
  title: string;
  requestor: string;
  priority: Priority;
  in_charge: Departments;
}

function Form() {
  console.log("Form's rendered");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    console.log(data);
    setValue("title", "")
  };

  return (
    <FormBox>
      <Title>Project Request</Title>
      <FormDoc onSubmit={handleSubmit(onSubmit)}>
        <Subtitle>Essentials</Subtitle>
        <GridSystem>
          <Grid>
            <Label>
              Title
              <Notice>{errors.title?.message}</Notice>
            </Label>
            <RequestTitleInput
              {...register("title", {
                required: "no title...?",
                maxLength: {value:20, message:"20 letter or less"}
              })}
            />
          </Grid>
          <Grid>
            <Label>
              Requestor
              <Notice>{errors.requestor?.message}</Notice>
            </Label>
            <RequestorInput
              {...register("requestor", {
                required: ' "Write requestor" ',
                pattern: {value:/^[A-Za-z]+$/i, message: 'you can\'t write digit numbers'}
              })}
            />
          </Grid>
          <Grid>
            <Label>Priority</Label>
            <Select {...register("priority")} defaultValue={Priority.NORMAL}>
              <option value={Priority.TOP}>TOP priority</option>
              <option value={Priority.HIGH}>HIGH priority</option>
              <option value={Priority.NORMAL}>Normal</option>
              <option value={Priority.LOW}>LOW priority</option>
            </Select>
          </Grid>
          <Grid>
            <Label>Department in charge</Label>
            <Select
              {...register("in_charge")}
              defaultValue={Departments.Service}
            >
              <option value={Departments.Service}>Service_Plan</option>
              <option value={Departments.FrontEnd}>Front_End</option>
              <option value={Departments.BackEnd}>Back_End</option>
              <option value={Departments.Design}>Design</option>
            </Select>
          </Grid>
        </GridSystem>
        <Btn value="SUBMIT" />
      </FormDoc>
    </FormBox>
  );
}

export default Form;
