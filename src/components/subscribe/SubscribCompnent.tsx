import { ReactNode } from "react";
import { Button } from "../others/buttons/buttons";
import './sass/SubscribStyle.css'
import { Toast } from "../others/toast/toast";

export default function SubscribComponent():ReactNode{
    return(
            <section className='subscribSection'>
                <h2>Subscribe Now and Begin<br/>Yout Journey</h2>
                <p>Subscribe to CyberNFTs newletter and start your journey into the world of digital art and NFTs</p>
                <div>
                    <input type="email" placeholder="yourEmail@gmail.com"/>
                    <Button content="Get Started" classes="button1 bg-pink text-bold" handleClickFunction={()=>Toast({title:'Oh, Hi!',timer:5,description:"Thank you for your interest, but we don't have a feature for this yet",showButton:false,})}/>
                </div>
            </section>
    )
}