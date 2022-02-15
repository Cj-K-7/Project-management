import { DragDropContext } from "react-beautiful-dnd";
import { ThemeProvider } from "styled-components";
import GlobalStyled from "./styles/Global-styled";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import { darkThemeAtom } from "./atoms";
import Form from "./components/Form";

function App() {
  const isDark = useRecoilValue(darkThemeAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <DragDropContext onDragEnd={() => {}}>
        <GlobalStyled />
        <Form />
      </DragDropContext>
    </ThemeProvider>
  );
}

export default App;
