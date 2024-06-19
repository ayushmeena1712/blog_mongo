import React, { useState } from "react";
import Dropdown from "./Dropdown.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navItems = [
    { name: "Home", slug: "/" },
    { name: "Login", slug: "/login" },
    { name: "Signup", slug: "/signup" },
    { name: "All Posts", slug: "/all-posts" },
    { name: "Add Post", slug: "/add-post" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full">
      <div className="w-full py-5 px-4 bg-[#6B8A7A] rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-center font-bold text-2xl">Logo</div>
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
            {/* <Dropdown
              className="overflow-hidden"
              navItems={navItems}
              isOpen={isDropdownOpen}
            /> */}

            <HamburgerMenu 
            className="overflow-hidden"
            navItems={navItems}
            isOpen={isDropdownOpen} 
            toggleMenu={toggleDropdown}
            />
          </div>
          <div className="hidden md:flex px-2">
            <ul className="flex gap-5">
              {navItems.map((item) => (
                <li
                  key={item.slug}
                  className="inline-block px-6 py-2 duration-200 font-semibold hover:bg-[#254336] rounded-full text-white"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
