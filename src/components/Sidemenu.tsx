import { Link, useLocation } from "react-router-dom";
import {
  UsersIcon,
  CurrencyDollarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const SideMenu: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const routes = [
    {
      icon: <UsersIcon className="h-7 w-7" />,
      label: "Usuários",
      path: "/users"
    },
    {
      icon: <CurrencyDollarIcon className="h-7 w-7" />,
      label: "Finanças",
      path: "/finance"
    }
  ];

  return (
    <aside
      className={`flex flex-col h-full bg-base-100 shadow-lg transition-all duration-200
        ${expanded ? "w-64" : "w-20"}`}
    >
      <div className="p-2 flex justify-end">
        <a
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full hover:bg-base-300 transition-colors"
        >
          {expanded ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
        </a>
      </div>

      <nav className="p-3 flex-1">
        {routes.map((route) => {
          const isActive = location.pathname.includes(route.path);
          return (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center gap-3 w-full h-14 px-4 text-[17px] justify-start
                ${isActive ? "highlight font-semibold" : ""}`}
            >
              {route.icon}
              {expanded && <span>{route.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};


export default SideMenu;
