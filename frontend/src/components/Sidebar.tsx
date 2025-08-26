import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Budgets", path: "/budgets" },
    { name: "Recurring", path: "/recurring" },
    { name: "Settings", path: "/settings" }, // optional
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen shadow-md">
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`font-semibold block cursor-pointer hover:text-blue-600 ${
                location.pathname === link.path ? "text-blue-600" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
