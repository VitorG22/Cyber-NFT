import { createContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { IUserNoPriorityData, initUsersFunctions } from "./scripts/usersFunction"

interface IAppContext {
  logedUserData: IUserNoPriorityData | null
  setLogedUserData: React.Dispatch<React.SetStateAction<IUserNoPriorityData|null>>
}

export const AppContext = createContext<IAppContext | null>(null)

function App() {
  const [logedUserData, setLogedUserData] = useState<IUserNoPriorityData|null>(null)
  useEffect(() => {
    initUsersFunctions()

  }, [])
  

  return (
    <>
      <AppContext.Provider value={{ logedUserData, setLogedUserData }}>
        <Toaster
          toastOptions={{
            unstyled: true,
            className: 'toast'}}
        />
        <Outlet />
      </AppContext.Provider>
    </>
  )
}

export default App
