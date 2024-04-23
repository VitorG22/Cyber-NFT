import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiamond } from "@fortawesome/free-solid-svg-icons"
import { ReactNode } from "react"
import './sass/HorizontalBar.css'

export default function HorizontalBar():ReactNode{

    return (
        <div id="horizontalBar" className='horizontalBar'>
            {/* <FontAwesomeIcon icon={faDiamond}/> */}
            <h4>Creativity</h4>
            <FontAwesomeIcon icon={faDiamond}/>
            <h4>Innovation</h4>
            <FontAwesomeIcon icon={faDiamond}/>
            <h4>Artistry</h4>
            <FontAwesomeIcon icon={faDiamond}/>
            <h4>Experience</h4>
        </div>
    )
}