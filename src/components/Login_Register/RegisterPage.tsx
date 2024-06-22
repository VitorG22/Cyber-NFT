import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import DefaultProfilePicture from "../others/profilePicture/profilePicture";
import { ProfilePictureArray } from "../../utils/ProfilePicturesArray";
import Modal from "../others/modal/modal";
import ProfilePicture from "../others/profilePicture/profilePicture";
import { ProfileFunctions } from "../../scripts/usersFunction";
import { PurpleBackground } from "../others/AnimatedBackground/animatedBackground";


export default function RegisterComponent(): ReactNode {


    const navigate = useNavigate()
    const { setLogedUserData } = useAppContext()
    const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState<boolean>(false)
    const [selectedPicturePath, setSelectedPicturePath] = useState<string>(ProfilePictureArray[0])

    console.log(selectedPicturePath)

    useEffect(() => {
        var registerForm = document.getElementById('RegisterForm') as HTMLFormElement
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault()
            const registerReturn = ProfileFunctions.create({
                ProfileName: (document.getElementById("nameInput") as HTMLInputElement).value,
                ProfileEmail: (document.getElementById("emailInput") as HTMLInputElement).value,
                ProfilePassword: (document.getElementById("passwordInput") as HTMLInputElement).value,
                ProfileImage: selectedPicturePath

            })
            console.log(registerReturn)
            if (registerReturn.loginStatus == true) {
                setLogedUserData(registerReturn.content.userData)
                navigate(`/Home`)
            }
        })
    }, [])


    return (
        <section className="registerPageContainer">
            <PurpleBackground/>
            {isProfilePictureModalOpen &&
                <Modal handleFunction={setIsProfilePictureModalOpen} >
                    <div className='profilePictureModal'>
                        {ProfilePictureArray.map((imgPath: string, index: number) => {
                            return <button onClick={() => setSelectedPicturePath(imgPath)} style={{ 'background': 'none' }}>
                                <ProfilePicture
                                    selectedPicturePath={selectedPicturePath}
                                    imgPath={imgPath}
                                    key={`imgPath${index}`}
                                    size="size-3"
                                />
                            </button>
                        })}
                    </div>
                </Modal>
            }
            <section className="registerPageSection">
                <h1>Register</h1>
                <form className="registerTop" id='RegisterForm'>
                    <div className="NameAndPicContainer">
                        <input type="text" required id="nameInput" placeholder="Name" name="Name" className="registerPageInput" />
                        <button type='button' onClick={() => setIsProfilePictureModalOpen(true)} style={{ 'background': 'none' }}>
                            <DefaultProfilePicture imgPath={selectedPicturePath} key={`imgPath${0}`} size="size-2" />
                        </button>
                    </div>
                    <input type="email" required id="emailInput" placeholder="Email" name="Email" className="registerPageInput" />
                    <p className="EmailErrorMessage" id='EmailErrorMessage'>E-mail already registered</p>
                    <input type="password" required id="passwordInput" placeholder="Password" name="Password" className="registerPageInput" />
                    <button type="submit" value="Register" className="registerPageButton" id='registerPageButton' >Register</button>
                    <p className="linkText">Do you have an account? <Link to="/Login">Login</Link></p>
                </form>

            </section>
        </section>
    )
}