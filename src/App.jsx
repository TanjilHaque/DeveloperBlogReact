import React from "react";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div>
        {/* <Signup></Signup> */}
        <Login></Login>
      </div>
    </ThemeProvider>
  );
};

export default App;
