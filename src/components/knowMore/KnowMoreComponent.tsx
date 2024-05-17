import { ReactNode } from 'react'
import PageSection from '../others/PageSectionComponent/PageSectionComponent'
import './sass/KnowMoreStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../others/buttons/buttons'
import { toast } from 'sonner'
import { ToastElement } from '../others/toast/toast'

export default function KnowMore(): ReactNode {

    return (
        <PageSection id='KnowMore'>
            <>
                <div className="bgImageContainer"></div>
                <div className="topGradient"></div>
                <main>
                    <section className='KnowMoreTopTexts'>
                        <h2>Embarking on a Digital Journey</h2>
                        <h2>Redefining Art Ownership</h2>
                        <h2>through Cyber NFT</h2>
                    </section>
                    <section>
                        <h4>Discover Art with Us</h4>
                        <article>
                            <p>
                                we're leading a digital renaissance by
                                revolutionizing how art is owned and
                                appreciated. Our platform leverages
                                blockchain-powered NFTs to redefine
                                art ownership, empowering artists and
                                enriching collectors in the vibrant
                                world of digital creativity
                            </p>
                            <div className='buttonsContainer'>
                                <Button classes='button1 bg-transparent border-white text-bold' content='Know More' handleClickFunction={() => toast(
                                    <ToastElement
                                        title="Sorry"
                                        description='This button has no functions, maybe next time'
                                        showButton={false}
                                    />,
                                    {
                                        duration: 5000
                                    }
                                )} />
                                <Button classes='button2 bg-pink ' handleClickFunction={() => toast(
                                    <ToastElement
                                        title="Sorry"
                                        description='This button has no functions, maybe next time'
                                        showButton={false}
                                    />,
                                    {
                                        duration: 5000
                                    }
                                )}><FontAwesomeIcon icon={faArrowRight} /></Button>
                            </div>
                        </article>
                    </section>
                </main>
            </>
        </PageSection>
    )
}