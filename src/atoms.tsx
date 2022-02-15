import { atom } from "recoil";

const localData = localStorage.getItem("porject\'s")

export const darkThemeAtom = atom({
    key: "DarkMod",
    default: true,
})