import { ReactNode } from "react";
import NavBar from "../components/others/NavBar/NavBar";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

export default function PageEstructure(): ReactNode {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}