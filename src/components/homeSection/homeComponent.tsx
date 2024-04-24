import { ReactNode, Suspense, lazy } from 'react'
import './sass/homeStyle.css'
import { ArtArray } from '../../utils/ArtsArray'
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
                                <HomeImgComponent componentClass='HomeImg3' imgPath={`${ArtArray[55].path}`}></HomeImgComponent>
                                <HomeImgComponent componentClass='HomeImg2' imgPath={`${ArtArray[61].path}`}></HomeImgComponent>
                                <HomeImgComponent componentClass='HomeImg1' imgPath={`${ArtArray[45].path}`}></HomeImgComponent>
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