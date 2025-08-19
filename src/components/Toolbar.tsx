import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type AppDispatch, clearLoggedUser } from "../store";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

interface ToolbarProps {
  title: string;
  backPage?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ title, backPage  }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = (): void => {
    dispatch(clearLoggedUser());
    navigate("/login");
  };

  const goBack = (): void => {
    navigate(backPage!);
  };

  return (
    <header className="absolute top-0 left-0 h-14 bg-base-100 shadow flex items-center justify-between px-4 w-full z-40">
      <div className="flex items-center gap-2">
        {backPage && (
          <a data-testid="back-button" onClick={goBack} className="p-1 rounded hover:bg-base-300 transition-colors">
            <ArrowLeftIcon className="h-6 w-6" />
          </a>
        )}
        <h2 data-testid="toolbar-title" className="text-xl font-semibold">{title}</h2>
      </div>
      <a
        onClick={logout}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300 transition-colors"
      >
        <ArrowRightEndOnRectangleIcon data-testid="logout-icon" className="h-6 w-6" />
      </a>
    </header>
  );
};

export default Toolbar;
