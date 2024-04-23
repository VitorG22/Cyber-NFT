import { ReactNode, Suspense, lazy } from 'react'
import './sass/homeStyle.css'
// import HomeImgComponent from './homeImgComponent'
const HomeImgComponent = lazy(()=> import('./homeImgComponent'))

export default function HomeComponent(): ReactNode {
    return (
        <section id="home">
            <>

                <div className='bgImageContainer'></div>
                <div className='bottomGradient'> </div>
                <main>

                    <section>
                        <h3 className='floatingText1'>Where Art<br />Meets the<br />Future</h3>
                        <h2 className='textCyber'>Cyber</h2>
                    </section>

                    <section>
                        <ul>
                            <Suspense>
                                <HomeImgComponent componentClass='HomeImg3' imgPath='images/img3.jpg'></HomeImgComponent>
                                <HomeImgComponent componentClass='HomeImg2' imgPath='images/img2.jpg'></HomeImgComponent>
                                <HomeImgComponent componentClass='HomeImg1' imgPath='images/img1.jpg'></HomeImgComponent>
                            </Suspense>
                        </ul>
                    </section>

                    <section>
                        <p>begin Your Journey</p>
                        <h3 className='floatingText2'>Connect with<br />visionary artists.</h3>
                        <h2 className='textNFT flooatingElement'>NFT</h2>
                    </section>
                </main>

            </>
        </section>
    )
}