// // import React from "react";
// // import { createRoot } from "react-dom/client";
// // import App from "./App";
// // import "./styles/global.css";

// // const container = document.getElementById("root");
// // const root = createRoot(container);
// // root.render(<App />);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./styles/global.css";
// import { ThemeProvider } from "./context/ThemeContext"; // ✅ Import provider

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(
//   <ThemeProvider>
//     <App />
//   </ThemeProvider>
// );






import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const container = document.getElementById("root");
const root = createRoot(container);

// ❌ Removed extra ThemeProvider (it already exists inside App.js)
// This prevents useContext(null) and AnimatePresence crashes.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
