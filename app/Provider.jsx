import React from 'react'
import Header from './_components/Header'

function Provider({children}) {
  return (
    <div>
      <div className='mt-28'>
      <Header />
      {children}
      </div>
    </div>
  )
}

export default Provider