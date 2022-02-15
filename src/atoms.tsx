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

interface IDataAtom {
  [key: string]: IForm[];
}

export const dataAtom = atom<IDataAtom>({
  key: "AllProjects",
  default: {
    New: [],
    Proceeding: [],
    Delayed: [],
    Issue: [],
  },
});
