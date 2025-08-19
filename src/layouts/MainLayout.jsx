import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function MainLayout() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#202020] to-[#050505] text-white">
            <Navbar />
            <div className="w-full max-w-[60rem] mx-auto py-6">
                <Outlet />
            </div>
        </div>
    )
}
