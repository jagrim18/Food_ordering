// // import React, { createContext, useEffect, useState } from "react";

// // // Create a Context object for theme management
// // export const ThemeContext = createContext();

// // export const ThemeProvider = ({ children }) => {
// //   // Load saved theme from localStorage or default to "light"
// //   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

// //   // Apply theme to <html> attribute and save preference
// //   useEffect(() => {
// //     document.documentElement.setAttribute("data-theme", theme);
// //     localStorage.setItem("theme", theme);
// //   }, [theme]);

// //   // Toggle between light and dark
// //   const toggleTheme = () => {
// //     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
// //   };

// //   return (
// //     <ThemeContext.Provider value={{ theme, toggleTheme }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };



// import React, { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "auto");

//   // Function to determine theme based on system time
//   const getAutoTheme = () => {
//     const hour = new Date().getHours();
//     return hour >= 18 || hour < 6 ? "dark" : "light"; // 6 PM - 6 AM dark mode
//   };

//   // Apply theme whenever it changes
//   useEffect(() => {
//     let effectiveTheme = theme === "auto" ? getAutoTheme() : theme;
//     document.documentElement.setAttribute("data-theme", effectiveTheme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // Update theme every 5 minutes if auto mode is active
//   useEffect(() => {
//     if (theme === "auto") {
//       const interval = setInterval(() => {
//         document.documentElement.setAttribute("data-theme", getAutoTheme());
//       }, 5 * 60 * 1000);
//       return () => clearInterval(interval);
//     }
//   }, [theme]);

//   // Manual toggle (cycles: light → dark → auto)
//   const toggleTheme = () => {
//     setTheme((prev) =>
//       prev === "light" ? "dark" : prev === "dark" ? "auto" : "light"
//     );
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };







// ✅ src/context/ThemeContext.js
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "auto");

  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6 ? "dark" : "light";
  };

  useEffect(() => {
    const effectiveTheme = theme === "auto" ? getAutoTheme() : theme;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "auto") {
      const interval = setInterval(() => {
        document.documentElement.setAttribute("data-theme", getAutoTheme());
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "auto" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
