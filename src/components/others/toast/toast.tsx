import { ReactNode } from "react";
import './sass/toastStyle.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
export interface IToast {
    title: string
    description: string
    showButton: boolean
    children?:string| ReactNode
    imgPath?:string
    uuid?: string

}



export function ToastElement({ title, description, showButton, children,uuid ,imgPath, handleFunction}: (IToast & {handleFunction?(uuid:string|undefined):void})): ReactNode {

    return (
        <>
            <div className="Toast">
                
                {handleFunction && 
                <button className="closeButton" onClick={()=>handleFunction(uuid)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                }
                {imgPath && <img src={`/${imgPath}`}/>}
                <article>
                    <h4 className='title'>{title}</h4>
                    <p className='description'>{description}</p>
                </article>
                {showButton && <button className="undoButton">{children}</button>}
            </div>
        </>

    )
}


