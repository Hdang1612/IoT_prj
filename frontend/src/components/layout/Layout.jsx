import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"
function Layout() {
  return (
    <div className="flex">
        <Sidebar/>
        <div className="flex-1 p-6">
        <Outlet /> 
        </div>
    </div>
  )
}

export default Layout