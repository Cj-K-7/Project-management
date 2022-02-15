import { ThemeProvider } from "styled-components";
import GlobalStyled from "./styles/Global-styled";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import { darkThemeAtom, dataAtom } from "./atoms";
import Form from "./components/Form";
import { useEffect } from "react";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  const isDark = useRecoilValue(darkThemeAtom);
  const data = useRecoilValue(dataAtom);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(data));
  }, [data]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyled />
      <LeaderBoard />
      <Form />
    </ThemeProvider>
  );
}

export default App;
