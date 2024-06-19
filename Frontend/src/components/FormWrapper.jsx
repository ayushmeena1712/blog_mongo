import React from 'react';

const FormWrapper = ({ children }) => {
  return (
    <div
      className="flex items-center justify-center h-100vh bg-cover bg-center rounded-xl "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className=" rounded-lg w-full mx-4 ">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
