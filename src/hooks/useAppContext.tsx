import { useContext } from "react"
import { AppContext } from "../App"

export const useAppContext = () =>{
    const appContext = useContext(AppContext)
    if(!appContext){
        throw new Error("AppContext data is missing!")
    }
    return appContext
}