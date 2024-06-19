// HamburgerMenu.js
import React, {useRef, useEffect} from "react";

function HamburgerMenu({ navItems,
      isOpen, 
      toggleMenu,
      className = "",
      ...props
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 right-0 h-full  bg-[#B7B597] shadow-lg ${
        isOpen ? "translate-x" : "translate-x-full"
      }  transition-transform duration-300 ease-in z-20 w-64 ${className}`}
       {...props}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <ul className="flex flex-col p-4">
        {navItems.map((item) => (
          <li key={item.slug} className="py-2">
            <a
              href={item.slug}
              className="text-gray-800 font-semibold hover:text-[#254336]"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HamburgerMenu;
