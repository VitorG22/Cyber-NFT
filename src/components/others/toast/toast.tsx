import { ReactNode, useState } from "react";
import './sass/toastStyle.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import uuid from "react-uuid";
export interface IToast {
    title: string
    description: string
    showButton: boolean
    children?:string| ReactNode
    imgPath?:string
    uuid?: string
    timer: number

}

export var Toast:({}:IToast)=>void;

export function ToastContainer(): ReactNode {
    const [toastsList, setToastsList] = useState<IToast[]>([])



    Toast = ({ title, description, showButton }: IToast): void => {

        var toastdata = {
            title: title,
            description: description,
            showButton: showButton,
            uuid: uuid(),
            timer: 10
        }

        setToastsList([...toastsList, toastdata])
        // toastDelete(toastdata.uuid)
    }

    function toastDelete(uuid:string|undefined):void{
        var list:IToast[] =[] 
            toastsList.forEach((element)=>{
            if(element.uuid != uuid){
                list.push(element)
            }
        })
        setToastsList(list)
    }

    return (
        <section className="toastContainer">
            {
                toastsList.map((toast): ReactNode => {
                    return (
                        <>
                            {toast.timer >= 0 ? (
                                <ToastElement 
                                title={toast.title} 
                                description={toast.description} 
                                showButton={toast.showButton} 
                                uuid={toast.uuid} 
                                timer={toast.timer} 
                                children={toast.children}
                                imgPath={toast.imgPath} 
                                handleFunction={toastDelete}/>
                            ) : (null)
                            }
                        </>
                    )
                })
            }
        </section >
    )
}



function ToastElement({ title, description, showButton, uuid, timer,children,imgPath, handleFunction}: (IToast & {handleFunction(uuid:string|undefined):void})): ReactNode {

    setTimeout(() => {
        handleFunction(uuid)
    }, timer*1000);

    return (
        <>
            <div className="toast">
                
                <button className="closeButton" onClick={()=>handleFunction(uuid)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                {imgPath && <img src={`/${imgPath}`}/>}
                <article>
                    <h4 className='title'>{title}</h4>
                    <p className='descrpition'>{description}</p>
                </article>
                {showButton && <button className="undoButton">{children}</button>}
                <span className="timeBar" style={{"animationDuration":`${timer}s`}} />
            </div>
        </>

    )
}


