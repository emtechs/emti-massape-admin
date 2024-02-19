import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  apiCalendar,
  apiClass,
  apiSchool,
  apiServer,
  apiUser,
  iChildren,
  iClass,
  iSchool,
  iUser,
  iYear,
} from '../../shared'

interface iDataContextData {
  loadingUser: boolean
  userData: iUser | undefined
  handleUserData: (id: string) => void
  handleServerData: (id: string) => void
  schoolData: iSchool | undefined
  loadingSchool: boolean
  handleSchoolData: (id: string) => void
  classData: iClass | undefined
  loadingClass: boolean
  handleClassData: (id: string) => void
  listYear: iYear[]
}

const DataContext = createContext({} as iDataContextData)

export const DataProvider = ({ children }: iChildren) => {
  const [userData, setUserData] = useState<iUser>()
  const [loadingUser, setLoadingUser] = useState(true)
  const [schoolData, setSchoolData] = useState<iSchool>()
  const [loadingSchool, setLoadingSchool] = useState(true)
  const [classData, setClassData] = useState<iClass>()
  const [loadingClass, setLoadingClass] = useState(true)
  const [listYear, setListYear] = useState<iYear[]>([])

  const handleUserData = useCallback((id: string) => {
    setLoadingUser(true)
    apiUser
      .retrieve(id)
      .then((res) => setUserData(res))
      .finally(() => setLoadingUser(false))
  }, [])

  const handleServerData = useCallback((id: string) => {
    setLoadingUser(true)
    apiServer
      .retrieve(id)
      .then((res) => setUserData(res))
      .finally(() => setLoadingUser(false))
  }, [])

  const handleSchoolData = useCallback((id: string) => {
    setLoadingSchool(true)
    apiSchool
      .retrieve(id)
      .then((res) => setSchoolData(res))
      .finally(() => setLoadingSchool(false))
  }, [])

  const handleClassData = useCallback((id: string) => {
    setLoadingClass(true)
    apiClass
      .retrieve(id)
      .then((res) => setClassData(res))
      .finally(() => setLoadingClass(false))
  }, [])

  useEffect(() => {
    apiCalendar.listYear().then((res) => setListYear(res))
  }, [])

  return (
    <DataContext.Provider
      value={{
        handleServerData,
        handleUserData,
        loadingUser,
        userData,
        handleSchoolData,
        loadingSchool,
        schoolData,
        listYear,
        classData,
        handleClassData,
        loadingClass,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext)
