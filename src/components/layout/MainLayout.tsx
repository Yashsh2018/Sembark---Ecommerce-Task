import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const MainLayout = () => {
  return (
    <>
        <AppNavbar />
        <Outlet />
    </>
    
  ) 
}

export default MainLayout