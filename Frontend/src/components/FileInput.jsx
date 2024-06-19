import React from 'react'

function FileInput({label}) {
      const id = React.useId();
  return (
    <div className='h-full w-full'>
      {label && <label 
            className='inline-block mb-2 pl-1' 
            htmlFor={id}>
                {label}
            </label>
      }
      <input type="file" />
    </div>
  )
}

export default FileInput