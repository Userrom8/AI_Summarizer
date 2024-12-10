import { useEffect, useContext } from "react";

import ThemeContext from "./services/theme";
import Hero from "./components/Hero";
import Demo from "./components/Demo";

import "./App.css";

const App = () => {
  const { dark, setDark } = useContext(ThemeContext);

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.style.colorScheme = "dark";
    else root.style.colorScheme = "light";
  }, [dark]);

  const backGround = () => {
    if (dark) {
      return (
        <div className="main_dark">
          <div className="gradient" />
        </div>
      );
    } else {
      return (
        <div className="main">
          <div className="gradient" />
        </div>
      );
    }
  };

  return (
    <main>
      {backGround()}

      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;
