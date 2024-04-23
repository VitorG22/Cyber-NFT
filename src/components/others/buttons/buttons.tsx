import { ReactNode } from "react";
import './sass/buttonStyle.css'

interface IButton{
    classes?: string
    color?: string
    content?: string
    children?: ReactNode
    handleClickFunction?:()=>void
}


export function Button({classes, color,content, children, handleClickFunction}:IButton):ReactNode{
    return(
        <button onClick={handleClickFunction} className={`${classes} ${color}`}>
            {content}
            {children}
        </button>
    )
}