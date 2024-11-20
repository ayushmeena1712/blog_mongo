import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu.jsx";
import { useSelector } from 'react-redux';
import { useAuth } from "../../Authcontext.jsx";
import Button from "../Button.jsx";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const authStatus = auth ? true : false;

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "About", slug: "/about" },
    { name: "All Blogs", slug: "/all-blogs"},
    { name: "Add Blog", slug: "/add-blog", active: authStatus },
    { name: "Profile", slug: "/userprofile", active: authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    // { name: "Logout", slug: "/logout", active: authStatus },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full">
      <div className="w-full py-5 px-4 bg-[#6B8A7A] rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-center font-bold text-2xl">
            <Link to="/">Logo</Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleDropdown}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <HamburgerMenu
              className="overflow-hidden"
              navItems={navItems}
              isOpen={isDropdownOpen}
              toggleMenu={toggleDropdown}
            />
          </div>
          <div className="hidden md:flex px-2">
            <ul className="flex gap-5">
              {navItems.map((item) =>
                item.active !== false ? (
                  <li key={item.slug}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `inline-block px-6 py-2 duration-200 font-semibold hover:bg-[#254336] rounded-full text-white ${
                          isActive ? "bg-[#254336]" : ""
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && 
              <div className="flex items-center">
                <Button className="bg-red-600"
                onClick={()=>{
                  try {
                    setAuth(null);
                  } catch (error) {
                    console.error("Error: " + error);
                  }
                  console.log("getting clicked");
                }}>
                  Logout
                </Button>
              </div>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
