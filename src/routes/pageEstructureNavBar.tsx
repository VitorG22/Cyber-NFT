import { ReactNode, useEffect } from "react";
import NavBar from "../components/others/NavBar/NavBar";
import Footer from "../components/footer/footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

export default function PageEstructure(): ReactNode {
    const { logedUserData } = useAppContext()
    const navigate = useNavigate()
    useEffect(() => {
        if(!logedUserData) {
            navigate('/Login')
        }
    }, [])
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}