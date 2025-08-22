import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

interface NavLink {
  id: string;
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { id: "home", name: "INICIO", href: "/" },
  { id: "collection", name: "PRENDAS", href: "/collection" },
  { id: "about", name: "NOSOTROS", href: "/about" },
  { id: "contact", name: "CONTACTO", href: "/contact" },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    logout,
  } = useContext(ShopContext);

  

  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className="flex flex-col items-center gap-1"
          >
            {link.name}
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 transition-opacity duration-300 hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt="search"
          onClick={() => setShowSearch(true)}
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile"
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-2.5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black hover:bg-gray-200 p-2 rounded">
                  Mi Perfil
                </p>
                <p
                  className="cursor-pointer hover:text-black hover:bg-gray-200 p-2 rounded"
                  onClick={() => navigate("/orders")}
                >
                  Mis Ordenes
                </p>
                <p
                  className="cursor-pointer hover:text-black hover:bg-gray-200 p-2 rounded"
                  onClick={logout}
                >
                  Cerrar Sesión
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.cart_icon}
            alt="cart"
          />
          <span className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </span>
        </Link>
        <img
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="menu"
          onClick={() => setOpenMenu(!openMenu)}
        />
      </div>

      {/* Mobile Design */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          openMenu ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setOpenMenu(false)}
            className="flex items-center gap-4 p-3"
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Atrás</p>
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              onClick={() => setOpenMenu(false)}
              className="py-2 pl-6 border-b border-gray-200"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
