import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { dataAtom, Departments, IForm, Priority } from "../atoms";
import styled from "styled-components";

const FormDoc = styled.form`
  position : absolute;
  bottom : 30px;
  right: 130px;
  background-color: ${(props) => props.theme.BgColor_bold};
  padding: 20px;
  input:focus {
    outline: ${(props) => props.theme.alertColor} solid 2px;
  }
`;
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const Title = styled.h1`
  margin: 20px 0px 0px 20px;
  font-size: 32px;
`;
const GridSystem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr) 3fr;
  grid-gap: 12px 18px;
`;
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Grid_TA = styled.div`
  grid-area: 3/1/4/3;
  display: flex;
  flex-direction: column;
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
  font-size: 11px;
  color: ${(props) => props.theme.alertColor};
`;
const RequestTitleInput = styled.input.attrs({
  type: "text",
})``;
const RequestorInput = styled.input.attrs({
  type: "text",
})``;
const Select = styled.select``;
const TextArea = styled.textarea`
  height: 100%;
  border: none;
  resize: none;
`;
const Btn = styled.input.attrs({
  type: "submit",
})`
  width: fit-content;
  align-self: flex-end;
  padding: 10px 16px;
  margin-top: 28px;
`;

function Form() {
  const setData = useSetRecoilState(dataAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    data.id = Date.now();
    setData((pre) => {
      return { ...pre, ["New"]: [data, ...pre["New"]] };
    });
    setValue("title", "");
  };

  return (
    <FormDoc onSubmit={handleSubmit(onSubmit)}>
      <FormBox>
        <Title>NEW PROJECT</Title>
        <Subtitle>ESSENTIALS</Subtitle>
        <GridSystem>
          <Grid>
            <Label>
              TITLE
              <Notice>{errors.title?.message}</Notice>
            </Label>
            <RequestTitleInput
              {...register("title", {
                required: "no title...?",
                maxLength: { value: 16, message: "16 letter or less" },
              })}
            />
          </Grid>
          <Grid>
            <Label>
              REQUESTOR
              <Notice>{errors.requestor?.message}</Notice>
            </Label>
            <RequestorInput
              {...register("requestor", {
                required: ' "who is requestor?" ',
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "you can't write digit numbers",
                },
              })}
            />
          </Grid>
          <Grid>
            <Label>PRIORITY</Label>
            <Select {...register("priority")} defaultValue={Priority.NORMAL}>
              <option value={Priority.TOP}>TOP priority</option>
              <option value={Priority.HIGH}>HIGH priority</option>
              <option value={Priority.NORMAL}>Normal</option>
              <option value={Priority.LOW}>LOW priority</option>
            </Select>
          </Grid>
          <Grid>
            <Label>IN_CHARGE</Label>
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
          <Grid_TA>
            <Label>
              DESCRIPTION
              <Notice>{errors.description?.message}</Notice>
            </Label>
            <TextArea
              placeholder="Write details"
              {...register("description")}
            />
          </Grid_TA>
        </GridSystem>
        <Btn value="SUBMIT" />
      </FormBox>
    </FormDoc>
  );
}

export default Form;
