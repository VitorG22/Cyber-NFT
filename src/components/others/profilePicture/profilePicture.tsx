import { ReactNode } from "react";
import './Sass/profilePicture.css'

export default function ProfilePicture(props: { imgPath?: string, selectedPicturePath?: string, size: 'size-1'|'size-2'|'size-3' }): ReactNode {

    return (
            <div className="profilePictureContainer">
                <img
                    // src="https://i.pinimg.com/564x/7c/48/3a/7c483ad0dafb70199a6e72f42ed0403e.jpg"
                    src={props.imgPath}
                    id={`imgId${props.imgPath}`}
                    className={`
                    profilePicture 
                    ${props.selectedPicturePath == props.imgPath ? "selectedPicture" : 'notSelectedPicture'}
                    ${props.size}
                    `}
                    srcSet="Profile picture"
                />
            </div>

    )
}