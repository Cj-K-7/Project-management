import { atom } from "recoil";

export const darkThemeAtom = atom({
  key: "darkThemeKey",
  default: true,
});

export enum Priority {
  TOP = "Top",
  HIGH = "HIGH",
  NORMAL = "Normal",
  LOW = "LOW",
}

export enum Departments {
  Service = "Service_Plan",
  FrontEnd = "Front_End",
  BackEnd = "Back_End",
  Design = "Design",
}

export interface IForm {
  id: number;
  title: string;
  requestor: string;
  priority: Priority;
  in_charge: Departments;
  description: string;
}

export interface IDataAtom {
  [key: string]: IForm[];
}

const localData = localStorage.getItem("projects")
const JSONDATA = JSON.parse(localData as any)

export const dataAtom = atom<IDataAtom>({
  key: "allData",
  default: JSONDATA || {
    New: [],
    Proceeding: [],
    Delayed: [],
    Issue: [],
  },
});

export const formToggleAtom = atom({
  key: "formToggle",
  default : false
})