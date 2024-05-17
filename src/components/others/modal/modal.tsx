import { Dispatch, ReactNode, SetStateAction } from "react";
import './Sass/modal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Modal(props: {
    children: React.ReactNode,
    handleFunction: Dispatch<SetStateAction<boolean>>
}): ReactNode {
    return (
        <section className="ModalContainer">
            <div className='Modal'>
                <button className='closeModalButton' onClick={() => props.handleFunction(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                {props.children}
            </div>
        </section>
    )
}