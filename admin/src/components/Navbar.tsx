import { assets } from "../assets/admin_assets/assets";
import { Link } from "react-router-dom";

export default function Navbar({setToken}: {setToken: (token: string) => void}) {
  return (
    <nav className="flex justify-between items-center py-2 px-[4%]">
        <Link to="/">
            <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
        </Link>
    <button onClick={() => setToken("")} className="bg-gray-600 text-white px-5 py- sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
    </nav>
  )
}
