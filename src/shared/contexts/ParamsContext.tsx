import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { iChildren } from '../../shared'

interface iParamsContextData {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

const ParamsContext = createContext({} as iParamsContextData)

export const ParamsProvider = ({ children }: iChildren) => {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)

  return (
    <ParamsContext.Provider
      value={{ isLoading, setIsLoading, count, setCount }}
    >
      {children}
    </ParamsContext.Provider>
  )
}

export const useParamsContext = () => useContext(ParamsContext)
