import SideMenu from "../components/Sidemenu";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
   return (
    <div className="flex h-screen">
      <SideMenu />

      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;