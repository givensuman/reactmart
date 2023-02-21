import React, { createContext, useContext, useState } from 'react'
import type { FC, ReactNode, Dispatch } from 'react'

const StoreContext = createContext(null)

export function useStore<T extends object = {
  [key: string]: any
}>() {
  return useContext<Store<T>>(StoreContext)
}

export type Store<T extends object> = {
  [Property in keyof T]: {
    readonly state: T[Property],
    set: Dispatch<React.SetStateAction<T[Property]>>
  }
}

interface Props {
  children?: ReactNode,
  value: object
}

export const StoreProvider: FC<Props> = ({ 
  children, 
  value,
  ...other
}) => {
  
  const store = Object.entries(value).reduce(
    (state, [key, value]) => {

      const storedKey = useState(value)

      return {
      ...state,
      [key]: {
        state: storedKey[0],
        set: storedKey[1]
      }
    }
    }, {})

  return (
    <StoreContext.Provider value={store} {...other}>
      {children}
    </StoreContext.Provider>
  )
}

export default useStore