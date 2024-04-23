import { Outlet } from "react-router-dom"
import NavBar from "./components/others/NavBar/NavBar"
import Footer from "./components/footer/footer"
import { ToastContainer } from "./components/others/toast/toast"

function App() {
  
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
