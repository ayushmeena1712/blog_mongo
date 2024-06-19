import React from 'react'

function Dropdown(
      {
            isOpen, 
            navItems,
            className = "",
            ...props
      }
) {
  return (
      <>
      {isOpen && (
        <div className={`absolute right-10 mt-6 bg-sky-300  rounded-md shadow-lg z-20 ${className}`} {...props}>
          <ul className="py-1">
            {navItems.map((item) => (
              <li key={item.slug} className="flex justify-center rounded-lg px-10 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Dropdown