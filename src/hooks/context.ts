import { createContext, useContext } from 'react'
import type { ActionProps, StoreProps } from '../../@types/index'

export const ActionContext = createContext<ActionProps>({})
export const StoreContext = createContext({})

export const useAction = (): ActionProps => {
  return useContext(ActionContext)
}
export const useStore = (): StoreProps => {
  return useContext(StoreContext)
}
