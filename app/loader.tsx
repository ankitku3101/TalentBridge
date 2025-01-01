import React from 'react'

function loader() {  
  return (
    <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  )
}

export default loader