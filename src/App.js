import React from "react";
import RTL from "./layouts/full-layout/customizer/RTL";
import LangSettings from "./layouts/full-layout/customizer/Language";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import ThemeSettings from "./layouts/full-layout/customizer/settings";
import { useSelector } from "react-redux";
import ThemeRoutes from "./routes/Router";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <LangSettings lang={customizer.activeLang}>
          <CssBaseline />

          <ThemeRoutes />
        </LangSettings>
      </RTL>
    </ThemeProvider>
  );
};

export default App;
