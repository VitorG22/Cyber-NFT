import { createContext, useState } from "react"
import { Outlet } from "react-router-dom"

interface IAppContext {
  logedUserIndex: number
  setLogedUserIndex: React.Dispatch<React.SetStateAction<number>>

}

export const AppContext = createContext<IAppContext | null>(null)

function App() {
  const [logedUserIndex, setLogedUserIndex] = useState<number>(-1)

  return (
    <>
      <AppContext.Provider value={{ logedUserIndex, setLogedUserIndex }}>
        <Outlet />
      </AppContext.Provider>
    </>
  )
}

export default App
