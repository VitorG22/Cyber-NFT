import { ReactNode, useEffect } from "react";
import './sass/navBarStyle.css'
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";
import { toast } from "sonner";
import { ToastElement } from "../toast/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHome, faPercentage, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import ProfilePicture from "../profilePicture/profilePicture";
import Cart from "../Cart/cart";


export default function NavBar(): ReactNode {

    const { logedUserData } = useAppContext()
    console.log(logedUserData)
    useEffect(() => {
        console.log(logedUserData)
    }, [])

    return (
        <nav className="navBar">
            <ul>

                {
                    <li>
                        <NavLink to={`/Home`} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}>
                            <FontAwesomeIcon icon={faHome} />
                            <p className="navLinkText">Home</p>
                        </NavLink>
                    </li>
                }

                {
                    <li>
                        <NavLink to={`/MarketPlace`} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}>
                            <FontAwesomeIcon icon={faEthereum} />
                            <p className="navLinkText">Market Place</p>
                        </NavLink>
                    </li>
                }

                {
                    <li>
                        {/* <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}> */}
                        {/* <a onClick={()=>Toast({title:'Sorry',timer:5,description:'This button has no functions, maybe next time',showButton:false,})}> */}
                        <a onClick={() => toast(
                            <ToastElement
                                title="Sorry"
                                description='This button has no functions, maybe next time'
                                showButton={false}
                            />,
                            {
                                duration: 5000
                            }
                        )}>
                            <FontAwesomeIcon icon={faPercentage} />

                            <p className="navLinkText">Offers</p>
                        </a>
                        {/* </NavLink> */}
                    </li>
                }

                {
                    <li>
                        <NavLink to="/Collectors" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}>
                            <FontAwesomeIcon icon={faUser} />
                            <p className="navLinkText">Collectors</p>
                        </NavLink>
                    </li>
                }

            </ul>
            <div className='rightNavButtonsContainer'>
                <NavLink to={`/ProfilePage/${logedUserData?.id}`} >
                    <ProfilePicture imgPath={logedUserData?.profileImage} size="size-1" />
                </NavLink>
                <Cart/>
            </div>

        </nav>
    )
}