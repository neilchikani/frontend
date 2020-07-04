import React, { useState, createContext } from 'react'

export const xyzContext = createContext();

export const xyzProvider = ({ children }) => {

  const [number, setNumber] = useState(0);

  return (
    <xyzContext.Provider value={[number, setNumber]}>
      {children}
    </xyzContext.Provider>
  )
}