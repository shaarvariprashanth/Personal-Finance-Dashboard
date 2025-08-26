

// import { useState } from "react";
// import {
//   LayoutDashboard,
//   PiggyBank,
//   Repeat,
//   Settings,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   // Toggle dark mode on <html> element
//   const handleToggle = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   const menuItems = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/" },
//     { name: "Budgets", icon: PiggyBank, path: "/budgets" },
//     { name: "Recurring Expenses", icon: Repeat, path: "/recurring" },
//   ];

//   return (
//     <div className="h-screen w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col justify-between transition-colors duration-300">
//       {/* Top Section */}
//       <div>
//         <div className="flex items-center gap-2 px-6 py-4">
//           <div className="bg-purple-600 text-white font-bold rounded-xl px-2 py-1">
//             P
//           </div>
//           <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//             PFD
//           </h1>
//         </div>

//         <p className="text-sm text-gray-400 px-6 mt-2">Main</p>

//         <nav className="mt-4">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-6 py-2 rounded-lg transition-all ${
//                   isActive
//                     ? "bg-purple-600 text-white"
//                     : "text-gray-600 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-800"
//                 }`
//               }
//             >
//               <item.icon className="w-5 h-5" />
//               <span>{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom Section */}
//       <div className="mb-6 px-6">
//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-sm text-gray-400">Mode</span>
//           <button
//             onClick={handleToggle}
//             className="w-14 h-7 flex items-center rounded-full p-1 bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
//           >
//             <div
//               className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 ${
//                 darkMode ? "translate-x-7 bg-black" : "translate-x-0 bg-white"
//               }`}
//             >
//               {darkMode ? (
//                 <Moon className="w-4 h-4 text-white" />
//               ) : (
//                 <Sun className="w-4 h-4 text-yellow-500" />
//               )}
//             </div>
//           </button>
//         </div>

//         <p className="text-sm text-gray-400 mb-2">Account Manage</p>
//         <NavLink
//           to="/settings"
//           className="flex items-center gap-3 px-2 py-2 rounded-lg text-gray-600 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-800 transition-colors duration-300"
//         >
//           <Settings className="w-5 h-5" />
//           Settings
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import { useState } from "react";
// import {
//   LayoutDashboard,
//   PiggyBank,
//   Repeat,
//   Settings,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const sidebarStyle = {
//     backgroundColor: darkMode ? "#111827" : "#ffffff", // dark gray or white
//     color: darkMode ? "#f9fafb" : "#1f2937", // text color
//     transition: "all 0.3s ease",
//   };

//   const buttonStyle = {
//     backgroundColor: darkMode ? "#374151" : "#e5e7eb", // toggle background
//   };

//   const toggleCircleStyle = {
//     transform: darkMode ? "translateX(28px)" : "translateX(0px)",
//     backgroundColor: darkMode ? "#000000" : "#ffffff",
//     transition: "all 0.3s ease",
//   };

//   const textColor = (light: string, dark: string) => ({
//     color: darkMode ? dark : light,
//     transition: "color 0.3s ease",
//   });

//   const menuItems = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/" },
//     { name: "Budgets", icon: PiggyBank, path: "/budgets" },
//     { name: "Recurring Expenses", icon: Repeat, path: "/recurring" },
//   ];

//   return (
//     <div style={sidebarStyle} className="h-screen w-64 shadow-lg flex flex-col justify-between p-0">
//       {/* Top Section */}
//       <div>
//         <div className="flex items-center gap-2 px-6 py-4">
//           <div style={{ backgroundColor: "#7c3aed", color: "#fff" }} className="font-bold rounded-xl px-2 py-1">
//             P
//           </div>
//           <h1 style={textColor("#1f2937", "#f9fafb")} className="text-xl font-semibold">
//             PFD
//           </h1>
//         </div>

//         <p style={textColor("#6b7280", "#9ca3af")} className="text-sm px-6 mt-2">Main</p>

//         <nav className="mt-4">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               style={textColor("#1f2937", "#d1d5db")}
//               className="flex items-center gap-3 px-6 py-2 rounded-lg hover:bg-purple-100 transition-all"
//             >
//               <item.icon className="w-5 h-5" />
//               <span>{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom Section */}
//       <div className="mb-6 px-6">
//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between mb-4">
//           <span style={textColor("#6b7280", "#9ca3af")} className="text-sm">
//             Mode
//           </span>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="w-14 h-7 flex items-center rounded-full p-1"
//             style={buttonStyle}
//           >
//             <div style={toggleCircleStyle} className="w-6 h-6 rounded-full flex items-center justify-center shadow-md">
//               {darkMode ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-yellow-500" />}
//             </div>
//           </button>
//         </div>

//         <p style={textColor("#6b7280", "#9ca3af")} className="text-sm mb-2">
//           Account Manage
//         </p>
//         <NavLink
//           to="/settings"
//           style={textColor("#1f2937", "#d1d5db")}
//           className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-purple-100 transition-all"
//         >
//           <Settings className="w-5 h-5" />
//           Settings
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import type { Dispatch, SetStateAction } from "react";
import {
  LayoutDashboard,
  PiggyBank,
  Repeat,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ darkMode, setDarkMode }: SidebarProps) => {
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const sidebarStyle = {
    backgroundColor: darkMode ? "#111827" : "#ffffff",
    color: darkMode ? "#f9fafb" : "#1f2937",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#374151" : "#e5e7eb",
  };

  const toggleCircleStyle = {
    transform: darkMode ? "translateX(28px)" : "translateX(0px)",
    backgroundColor: darkMode ? "#000000" : "#ffffff",
    transition: "all 0.3s ease",
  };

  const textColor = (light: string, dark: string) => ({
    color: darkMode ? dark : light,
    transition: "color 0.3s ease",
  });

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Budgets", icon: PiggyBank, path: "/budgets" },
    { name: "Recurring Expenses", icon: Repeat, path: "/recurring" },
  ];

  return (
    <div
      style={sidebarStyle}
      className="h-screen w-64 shadow-lg flex flex-col justify-between p-0"
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center gap-2 px-6 py-4">
          <div
            style={{ backgroundColor: "#7c3aed", color: "#fff" }}
            className="font-bold rounded-xl px-2 py-1"
          >
            PFD
          </div>
          <h1
            style={textColor("#1f2937", "#f9fafb")}
            className="text-xl font-semibold"
          >
            Personal-FinD
          </h1>
        </div>

        <p
          style={textColor("#6b7280", "#9ca3af")}
          className="text-sm px-6 mt-2"
        >
          Main
        </p>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={textColor("#1f2937", "#d1d5db")}
              className="flex items-center gap-3 px-6 py-2 rounded-lg hover:bg-purple-100 transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mb-6 px-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span style={textColor("#6b7280", "#9ca3af")} className="text-sm">
            Mode
          </span>
          <button
            onClick={toggleDarkMode}
            className="w-14 h-7 flex items-center rounded-full p-1"
            style={buttonStyle}
          >
            <div
              style={toggleCircleStyle}
              className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
            >
              {darkMode ? (
                <Moon className="w-4 h-4 text-white" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          </button>
        </div>

        <p
          style={textColor("#6b7280", "#9ca3af")}
          className="text-sm mb-2"
        >
          Account Manage
        </p>
        <NavLink
          to="/settings"
          style={textColor("#1f2937", "#d1d5db")}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-purple-100 transition-all"
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
