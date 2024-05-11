import { ReactNode } from "react";
import { ArtArray } from "../../utils/ArtsArray";
import { Link, useNavigate } from "react-router-dom";
import { IUser, Register } from "../../scripts/login";
import { useAppContext } from "../../hooks/useAppContext";

export default function RegisterComponent(): ReactNode {
    var randomImgPath = ArtArray[Math.floor(Math.random() * ArtArray.length)].path

    const navigate = useNavigate()
    const { setLogedUserIndex } = useAppContext()


    function callToRegister(props: IUser) {
        let loginIndexReturn = Register(props)
        if (loginIndexReturn != undefined) {
            setLogedUserIndex(loginIndexReturn)
            navigate('/Cyber-NFT/Home')
        }
    }

    return (
        <section className="registerPageContainer">
            <section className="registerPageSection">
                <h1>Register</h1>
                <form className="registerTop" id='RegisterForm' onSubmit={() => callToRegister({
                    email: (document.getElementById('emailInput') as HTMLInputElement).value,
                    name: (document.getElementById('nameInput') as HTMLInputElement).value,
                    password: (document.getElementById('passwordInput') as HTMLInputElement).value
                })}>
                    <input type="text" required id="nameInput" placeholder="Name" name="Name" className="registerPageInput" />
                    <input type="email" required id="emailInput" placeholder="Email" name="Email" className="registerPageInput" />
                    <input type="password" required id="passwordInput" placeholder="Password" name="Password" className="registerPageInput" />
                    <input type="submit" value="Register" className="registerPageButton" />
                    <p className="linkText">Do you have an account? <Link to="/Cyber-NFT/Login">Login</Link></p>
                </form>

            </section>
            <div className="imgContainerRegister"><img src={randomImgPath} /></div>
        </section>
    )
}