import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { dataAtom, Departments, IForm, Priority } from "../atoms";
import {
  FormBox,
  FormDoc,
  GridSystem,
  Grid,
  Grid_TA,
  Title,
  Subtitle,
  Label,
  Notice,
  RequestTitleInput,
  RequestorInput,
  Select,
  TextArea,
  Btn,
} from "./FormComponents";

function Form() {
  const setData = useSetRecoilState(dataAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  
  const onSubmit = (data: IForm) => {
    data.id= Date.now();
    setData((pre)=>{
      return {...pre, ["New"]: [ data, ...pre["New"]]}
    })
    setValue("title", "");
  };

  return (
    <FormBox>
      <Title>NEW PROJECT</Title>
      <FormDoc onSubmit={handleSubmit(onSubmit)}>
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
                maxLength: { value: 20, message: "20 letter or less" },
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
      </FormDoc>
    </FormBox>
  );
}

export default Form;
