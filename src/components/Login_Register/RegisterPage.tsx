import { ReactNode, useEffect } from "react";
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
            navigate('/Home')
        }
    }

    useEffect(() => {
        var registerInput = document.getElementById('RegisterForm') as HTMLFormElement
        registerInput?.addEventListener('submit', function (e) {
            e.preventDefault()
            callToRegister({
                email: (document.getElementById('emailInput') as HTMLInputElement).value,
                name: (document.getElementById('nameInput') as HTMLInputElement).value,
                password: (document.getElementById('passwordInput') as HTMLInputElement).value
            })
        })
    }, [])


    return (
        <section className="registerPageContainer">
            <section className="registerPageSection">
                <h1>Register</h1>
                <form className="registerTop" id='RegisterForm' >
                    <input type="text" required id="nameInput" placeholder="Name" name="Name" className="registerPageInput" />
                    <input type="email" required id="emailInput" placeholder="Email" name="Email" className="registerPageInput" />
                    <input type="password" required id="passwordInput" placeholder="Password" name="Password" className="registerPageInput" />
                    <input type="submit" value="Register" className="registerPageButton" />
                    <p className="linkText">Do you have an account? <Link to="/Login">Login</Link></p>
                </form>

            </section>
            <div className="imgContainerRegister"><img src={randomImgPath} /></div>
        </section>
    )
}