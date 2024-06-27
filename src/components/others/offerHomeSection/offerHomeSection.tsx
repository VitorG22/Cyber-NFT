import { ReactNode } from "react";
import { Button } from "../buttons/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { ArtArray } from "../../../utils/ArtsArray";
import './sass/offerStyle.css'
import LightsBackground from "../AnimatedBackground/animatedBackground";
import { NavLink } from "react-router-dom";

export default function OfferPage(): ReactNode {
    return (
        <section className='offerPage' id='offerPage'>
            <LightsBackground />
            <section>
                <h5>Big<br />Promo</h5>
                <h2>Limited Time<br />Offer. AI Model<br />Deals Await</h2>
                <div>
                    <p>Explore our Limited Time Offer on CyberNFT and Discover Exclusive deals on rare and unique NFT artWorks exclusive. Don't miss this opportunity to ass stunning digital masterpieces to your collection</p>
                    <ul>
                        <li><Button content="Buy Now" classes="button1 text-white bg-transparent border-white text-bold" /></li>
                        <li>
                            <Button classes="button2 bg-pink text-white">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <div className='card1'>
                    <img src={ArtArray[30].path} />
                    <NavLink to="/Offers" >
                        <Button classes='button2 bg-white text-black' >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </NavLink>
                </div>
                <div className='card2'>
                    <article>
                        <div className="pinkCardTop">
                            <h2>Discover <br />Exclusive Promos</h2>
                            <NavLink to="/Offers" >
                                <Button classes='button2 bg-white text-black'>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Button>
                            </NavLink>
                        </div>
                        <p>
                            Welcome to CyberNFT's exclusive promo section, where art enthusiasts and collectors converge to explore a treasure trove of digital masterpieces. Our curated selection of AI model portraits in mesmerizing neon purple hues awaits, each piece a testament to the fusion of creativity and technology. As you navigate throungh our promo offers, immerse yourself in the captivating narratives woven into each artwork
                        </p>
                    </article>
                </div >
                <div className='card3'>
                    <img src={ArtArray[6].path} />
                    <NavLink to='/Offers'>
                        <Button classes='button2 bg-white text-black'>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </NavLink>

                </div >
                <div className='card4'>
                    <img src={ArtArray[43].path} />
                    <NavLink to='/Offers'>
                        <Button classes='button2 bg-white text-black'>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </NavLink>
                </div>
            </section >
        </section >
    )
}