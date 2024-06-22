import { GoogleLogin, GoogleOAuthProvider, } from "@react-oauth/google";
import { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import './sass/loginComponentStyle.css'
import '../../scripts/login'
// import { IUser, Login, Register } from "../../scripts/login";
// import { ArtArray } from "../../utils/ArtsArray";
import { useAppContext } from "../../hooks/useAppContext";
import { ProfileFunctions } from "../../scripts/usersFunction";
import { PurpleBackground } from "../others/AnimatedBackground/animatedBackground";


interface IGoogleResponse {
    name: string
    email: string
    sub: string
    picture: string
}


export default function LoginComponent(): ReactNode {
    const { setLogedUserData } = useAppContext()
    const navigate = useNavigate()

    
    useEffect(() => {
        const loginForm = document.getElementById('loginForm') as HTMLFormElement
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault()
            const loginReturn = ProfileFunctions.login({
                ProfileEmail: (document.getElementById("emailInput") as HTMLInputElement).value,
                ProfilePassword: (document.getElementById("passwordInput") as HTMLInputElement).value
            })
            console.log(loginReturn)
            if (loginReturn?.loginStatus == true) {
                setLogedUserData(loginReturn.content.userData)
                navigate(`/Home`)
            }
        })
    }, [])

    function LoginWithGoogle({ name, email, password, imgPath }: { name: string, email: string, password: string, imgPath: string }) {
        const loginReturn = ProfileFunctions.login({
            ProfileEmail: email,
            ProfilePassword: password
        })
        console.log(loginReturn)

        if (loginReturn?.loginStatus == true) {
            setLogedUserData(loginReturn.content.userData)
            navigate(`/Home`)
        } else {
            const registerReturn = ProfileFunctions.create({
                ProfileEmail: email,
                ProfileName: name,
                ProfilePassword: password,
                ProfileImage: imgPath
            })
            if (registerReturn.loginStatus == true) {
                setLogedUserData(registerReturn.content.userData)
                navigate(`/Home`)
            }

        }
    }

    return (
        <section className="loginPageContainer">
            <PurpleBackground/>
            <section className="loginPageSection">
                <h1>Sign in</h1>
                <form
                    id="loginForm"
                    className="loginTop"
                >
                    <input type="email" required placeholder="Email" id="emailInput" className="loginPageInput" />
                    <input type="password" required placeholder="Password" id="passwordInput" className="loginPageInput" />
                    <input type="submit" value="Login" className="loginPageButton" />
                </form>

                <p>or</p>

                <div className="loginBottom">
                    <GoogleOAuthProvider clientId="289460002198-gq16afh9fjjqu146j6hftlu5gtl44d72.apps.googleusercontent.com" >
                        <button className="googleButtonContainerSmall">
                            <GoogleLogin type="icon" theme="outline" text="signin_with" size="large" shape="square"
                                onSuccess={(resp) => {
                                    if (resp.credential) {
                                        const decode: IGoogleResponse = jwtDecode(resp.credential)
                                        console.log(decode)
                                        LoginWithGoogle({
                                            name: decode.name,
                                            email: decode.email,
                                            password: decode.sub,
                                            imgPath: decode.picture
                                        })
                                    }
                                }}
                                onError={() => console.log('can you try again?')}
                            />
                        </button>
                        <button className="googleButtonContainerLarge">
                            <GoogleLogin
                                onSuccess={(resp) => {
                                    if (resp.credential) {
                                        const decode: IGoogleResponse = jwtDecode(resp.credential)
                                        console.log(decode)
                                        LoginWithGoogle({
                                            name: decode.name,
                                            email: decode.email,
                                            password: decode.sub,
                                            imgPath: decode.picture
                                        })
                                    }
                                }
                                }
                                onError={() => console.log('can you try again?')}
                            />
                        </button>
                    </GoogleOAuthProvider>
                    <Link className='loginPageRegisterButton' to="/Register">Register</Link>
                </div>
            </section>
        </section>
    )
}