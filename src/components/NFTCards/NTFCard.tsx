import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import searchImg from "../../scripts/searchImg";
import { convertValue } from "../../scripts/moneyConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";


export default function NFTCard({ id, pathStart = '' }: { id: string, pathStart?: string }): ReactNode {

    const [bid_ETH_USD, setBid_ETH_USD] = useState(0)

    async function setBid() {
        setBid_ETH_USD(await convertValue) // taxa de converção de ethereum para dolar americano
    }
    useEffect(() => {
        setBid()
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const artObject = searchImg(id)

    return (
        <Link to={`/ArtPreview/${artObject?.id}`} style={{ "textDecoration": 'none' }} onClick={() => scrollToTop()}>
            <div className='Card'>
                <div className="imgContainer">
                    <img src={`${pathStart}${artObject?.path}`} alt="" />
                </div>
                <div className='cardInfos'>
                    <div className="cardTopTexts">
                        <h3 className="CardTitle">{artObject?.ArtName}</h3>
                        <p>{artObject?.collectionName}</p>
                    </div>
                    <section>
                        <ul>
                            <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" /></svg></li>
                            <li>
                                <span>{artObject?.EHT_price}</span>
                                <span>eht</span>
                            </li>
                        </ul>
                        <div>
                            <span>${artObject?.EHT_price && ((artObject.EHT_price * bid_ETH_USD).toFixed(2))}</span>
                            <span>USD</span>
                        </div>
                        {/* <Link to={`/Cyber-NFT/ArtPreview/${artObject?.id}`} style={{ "textDecoration": 'none' }}> */}
                        {/* <Button handleClickFunction={scrollToTop} content="View" classes="button1 font-1 bg-transparent border-white text-white text-500" /> */}
                        {/* </Link> */}
                    </section>
                </div>
                {artObject?.isOffer && (
                    <span className="offerIcon" >
                        <FontAwesomeIcon icon={faPercentage} size="sm" />
                    </span>
                )}
            </div>
        </Link>
    )
}