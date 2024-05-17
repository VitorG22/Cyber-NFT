import { ReactNode } from "react";
import './Sass/profilePicture.css'

export default function ProfilePicture(props: { imgPath?: string, selectedPicturePath?: string, size: 'size-1'|'size-2'|'size-3' }): ReactNode {

    return (
        <>
            <div className="profilePictureContainer">
                <img
                    id={`imgId${props.imgPath}`}
                    className={`
                    profilePicture 
                    ${props.selectedPicturePath == props.imgPath ? "selectedPicture" : 'notSelectedPicture'}
                    ${props.size}
                    `}
                    src={props.imgPath}
                    srcSet="Profile picture"
                />
            </div>
        </>

    )
}