import React from 'react'

const Main = ({children}) => {
  return (
    <main
      className='flex min-h-screen flex-col items-center md:p-10 lg:p-24 relative p-5 pr-1'
      style={{ paddingTop: "10px" }}
    >
      {children}
    </main>
  )
}

export default Main