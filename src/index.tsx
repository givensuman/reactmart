import React, {
  FC, ReactNode,
  createContext, useContext, useReducer, 
} from 'react';

const StoreContext = createContext(null)
const useStore = <T,>() => useContext<T>(StoreContext)

interface Props {
  children?: ReactNode,
  value: object
}

const StoreProvider: FC<Props> = ({ children, value }) => {
  
  const reducer = (state, action) => {
    return {
      ...state,
      [action.type]: {
        ...state[action.type],
        state: action.payload
      }
    }
  }

  const state = Object.entries(value).reduce(
    (state, [key, value]) => ({
      ...state,
      [key]: {
        state: value,
        set: (setter) => dispatch({ type: key, payload: setter })
      }
    }), {})

  const [store, dispatch] = useReducer(reducer, state)

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreProvider, useStore as default }