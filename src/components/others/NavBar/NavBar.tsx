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


export default function NavBar(): ReactNode {
    const [User, setUser] = useState<IUser>()
    const { logedUserIndex } = useAppContext()
    console.log(logedUserIndex)
    var UsersList = localStorage.getItem("CyberNFTUsers")
    useEffect(() => {
        if (UsersList != null) {
            setUser(JSON.parse(UsersList)[logedUserIndex])
        }
    }, [])

    return (
        <nav className="navBar">
            {/* <NavLink to="/Home" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" /></svg>
                </div>
            </NavLink> */}
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
                                handleFunction={() => { }}
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
                                handleFunction={() => { }}
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
            <img className="profileImg" src={User?.imgPath} alt="" />
        </nav>
    )
}