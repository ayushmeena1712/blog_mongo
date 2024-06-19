import React from 'react'

function Wrapper({children, className}) {
  return (
    <div className={`${className} w-full h-full`}>
      {children}
    </div>
  )
}

export default Wrapper