// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./styles/global.css";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Import provider

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
