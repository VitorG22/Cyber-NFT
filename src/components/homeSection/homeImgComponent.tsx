import { ReactNode } from "react";

export default function HomeImgComponent({componentClass, imgPath}: {componentClass: string, imgPath:string}):ReactNode{
    return(
        <li className={componentClass}><img src={imgPath} /></li>
    )
}