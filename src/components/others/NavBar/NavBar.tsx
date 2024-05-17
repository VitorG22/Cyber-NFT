import { ReactNode, useEffect, useState } from "react";
import './sass/navBarStyle.css'
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";
import { IUser } from "../../../scripts/login";
import { toast } from "sonner";
import { ToastElement } from "../toast/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPercentage, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import ProfilePicture from "../profilePicture/profilePicture";


export default function NavBar(): ReactNode {
    const [User, setUser] = useState<IUser>()
    const { logedUserIndex } = useAppContext()
    console.log(logedUserIndex)
    var UsersList = localStorage.getItem("CyberNFTUsers")
    useEffect(() => {
        if (UsersList != null) {
            setUser(JSON.parse(UsersList)[logedUserIndex])
            console.log(logedUserIndex)
        }
    }, [logedUserIndex])

    return (
        <nav className="navBar">
            <ul>

                {
                    <li>
                        <NavLink to="/Home" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}>
                            <FontAwesomeIcon icon={faHome} />
                            Home
                        </NavLink>
                    </li>
                }

                {
                    <li>
                        <NavLink to="/MarketPlace" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}>
                            <FontAwesomeIcon icon={faEthereum} />
                            Market Place
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

                            Offers
                        </a>
                        {/* </NavLink> */}
                    </li>
                }

                {
                    <li>
                        {/* <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}> */}
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
                            <FontAwesomeIcon icon={faUser} />
                            Collectors
                        </a>
                        {/* </NavLink> */}
                    </li>
                }

            </ul>

                <ProfilePicture imgPath={User?.imgPath} size="size-1"/> 
            {/* <img className="profileImg" src={User?.imgPath} alt="" /> */}

        </nav>
    )
}