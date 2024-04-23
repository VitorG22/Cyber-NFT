import { ReactNode } from "react";
import { Button } from "../others/buttons/buttons";
import { IArtObject } from "../../utils/ArtsArray";
import { Link } from "react-router-dom";



export default function NFTCard(object: IArtObject): ReactNode {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className='Card'>
            <div className="imgContainer">
                <img src={`/${object.path}`} alt="" />
            </div>
            <div className='cardInfos'>
                <div className="cardTopTexts">
                    <h3 className="CardTitle">{object.ArtName}</h3>
                    <p>{object.collectionName}</p>
                </div>
                <section>
                    <ul>
                        <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" /></svg></li>
                        <li>
                            <span>{object.price}</span>
                            <span>eht</span>
                        </li>
                    </ul>
                    <div>
                        <span>$5</span>
                        <span>024</span>
                    </div>
                    <Link to={`/ArtPreview/${object.id}`} style={{ "textDecoration": 'none' }}>
                        <Button handleClickFunction={ scrollToTop} content="View" classes="button1 font-1 bg-transparent border-white text-white text-500" />
                    </Link>
                </section>
            </div>
        </div>
    )
}