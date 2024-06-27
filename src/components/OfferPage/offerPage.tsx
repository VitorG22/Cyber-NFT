import { ReactNode, useEffect } from "react";
import { CollectionArray } from "../../utils/CollectionArray";
import { ArtsFunctions } from "../../scripts/artsFunctions";
import './sass/offerPage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../others/buttons/buttons";
import LightsBackground from "../others/AnimatedBackground/animatedBackground";
import { Link } from "react-router-dom";
import { IArtObject } from "../../utils/ArtsArray";
import NFTCardPage from "../NFTCards/NFTCardPage";


export default function OfferPage(): ReactNode {
    const AllNftsList: IArtObject[] = ArtsFunctions.readAll()
    var offerNftsList: string[] = []
    AllNftsList?.forEach((nftObject) => {
        if (nftObject.isOffer == true) {
            offerNftsList.push(nftObject.id)
        }
    })

    return (
        <section className='offerPageSection'>
            <LiquifyCollectionSection />
            <CollectionOffersHeader />

            <DefaultCollectionSection>
                <DefaultCollectionArticle collectionId='A001' articlePosition='articleInLeft' />
                <DefaultCollectionImageList collectionId='A001' />
            </DefaultCollectionSection>

            <DefaultCollectionSection>
                <LightsBackground />
                <DefaultCollectionImageList collectionId='A004' />
                <DefaultCollectionArticle collectionId='A004' articlePosition='articleInRight' />
            </DefaultCollectionSection>

            <DefaultCollectionSection>
                <DefaultCollectionArticle collectionId='A006' articlePosition='articleInLeft' />
                <DefaultCollectionImageList collectionId='A006' />
            </DefaultCollectionSection>

            <UniqueOffersHeader />
            <NFTCardPage searchBar={false} showFilter={false} title="" isProfileCollectionRender={true} profileCollectionToRender={offerNftsList} />
        </section>
    )
}

function LiquifyCollectionSection() {
    const { CollectionData, CollectionNfts } = getCollection("A009")

    if (!CollectionData || !CollectionNfts) return

    useEffect(() => {
    //faz com que o elemento ball siga a posição do mouse
        const $ball: HTMLElement| null = document.getElementById('ball')
        const $blurContainer: HTMLElement| null = document.getElementById('blurContainer')
        document.addEventListener('mousemove', (e) => {
            if(!$ball || !$blurContainer) {return}
            $ball.style.top =`${e.y - $blurContainer.getBoundingClientRect().top - ($ball.getBoundingClientRect().height / 2) }px`
            $ball.style.left = `${e.x - $blurContainer.getBoundingClientRect().left - ($ball.getBoundingClientRect().width / 2)}px`
        })
    }, [])


    return (
        <section className="liquifyCollection">
            <LightsBackground />
            <ul className="liquifyCollectionImagesContainer">
                <li className='liquifyCollectionImage1'><img className='liquifyCollectionImage' src={CollectionNfts[0]?.path} /></li>
                <li className='liquifyCollectionImage2'><img className='liquifyCollectionImage' src={CollectionNfts[1]?.path} /></li>
                <li className='liquifyCollectionImage3'><img className='liquifyCollectionImage' src={CollectionNfts[2]?.path} /></li>
                <li className='liquifyCollectionImage4'><img className='liquifyCollectionImage' src={CollectionNfts[5]?.path} /></li>
                <li className='article'>
                    <h1>{CollectionData.name}</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi doloribus autem iure voluptatum saepe nulla ea corrupti reprehenderit dicta. Sint officia quisquam iste fugiat eaque deserunt blanditiis velit voluptatem doloremque!
                    </p>
                    <div className='buttonsContainer'>
                    <Link to={`/ArtPreview/${CollectionNfts[0]?.id}`}>
                        <Button classes="button3 bg-white">
                            See The Collection
                            <FontAwesomeIcon icon={faArrowRight} />
                            <div className='blurConatiner' id='blurContainer'>
                                <div
                                    className='ball' 
                                    id='ball'
                                />
                                <div className='square' />
                            </div>
                        </Button>
                    </Link>
                        <Button classes="button3 bg-transparent border-white">
                            <FontAwesomeIcon icon={faPlay} />
                            Watch intro video
                        </Button>
                    </div>
                </li>
            </ul>
        </section>
    )

}

function CollectionOffersHeader() {
    const { CollectionNfts } = getCollection('A006')

    return (
        <section className="headerCollection">
            <ul className="headerCollectionImagesContainer">
                {CollectionNfts?.map((nft, index) => {
                    return (
                        <li className="headerCollectionImgBox"
                            style={{
                                'animationDelay': `${(30 / CollectionNfts?.length) * index}s`
                            }}
                        ><img className='headerCollectionImg' src={nft?.path} /></li>
                    )
                })}
            </ul>
            <article>
                <h1>Collections Offers</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis odio eu libero molestie interdum id et erat. Aenean nec pretium neque, quis viverra est. Morbi vel metus vel nulla feugiat dignissim vitae ac justo. Nullam aliquam iaculis mauris tincidunt facilisis. Quisque ultrices, sem in elementum bibendum, tortor arcu mollis dolor, egestas maximus orci ante vitae libero. Cras in sapien enim. Sed libero diam, mattis ac egestas quis, laoreet sit amet ante. Donec mollis sed tellus eget finibus.<br />
                </p>
            </article>
        </section>
    )
}
function UniqueOffersHeader() {
    var collectionNftsIds = ["BA05", "DB06", "CA04", "FB07", "DB08"]
    var CollectionNfts: Array<IArtObject> = []
    collectionNftsIds.forEach((nftId) => {
        var Art = ArtsFunctions.readById(nftId)
        if (Art) CollectionNfts.push(Art)
    })

    return (
        <section className="headerUnique">
            <article>
                <h1>Unique Offers</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis odio eu libero molestie interdum id et erat. Aenean nec pretium neque, quis viverra est. Morbi vel metus vel nulla feugiat dignissim vitae ac justo. Nullam aliquam iaculis mauris tincidunt facilisis. Quisque ultrices, sem in elementum bibendum, tortor arcu mollis dolor, egestas maximus orci ante vitae libero. Cras in sapien enim. Sed libero diam, mattis ac egestas quis, laoreet sit amet ante. Donec mollis sed tellus eget finibus.
                </p>
            </article>
            <ul className="headerUniqueImagesContainer">
                {CollectionNfts?.map((nft, index) => {
                    return (
                        <li className="headerUniqueImgBox"
                            style={{
                                'animationDelay': `${(30 / CollectionNfts?.length) * index}s`
                            }}
                        ><img className='headerUniqueImg' src={nft?.path} /></li>
                    )
                })}
            </ul>
        </section>
    )
}


//default Collection
function DefaultCollectionSection({ children }: { children?: ReactNode }) {

    return (

        <section className='defaultCollection'>
            {children}
        </section>
    )
}

function DefaultCollectionImageList({ collectionId }: { collectionId: string }) {
    const { CollectionNfts } = getCollection(collectionId)

    if (!CollectionNfts) return
    return (
        <ul className='defaultCollectionImagesContainer'>
            <li className="defaultcollectionImgBox"><img className="defaultCollectionImg" src={CollectionNfts[0]?.path} /></li>
            <li className="defaultcollectionImgBox"><img className="defaultCollectionImg" src={CollectionNfts[1]?.path} /></li>
            <li className="defaultcollectionImgBox"><img className="defaultCollectionImg" src={CollectionNfts[2]?.path} /></li>
        </ul>
    )
}

function DefaultCollectionArticle({ collectionId, articlePosition }: { collectionId: string, articlePosition: 'articleInLeft' | 'articleInRight' }) {
    const { CollectionData, CollectionNfts } = getCollection(collectionId)
    if (!CollectionNfts) return
    return (
        <article className={articlePosition}>
            <h1>{CollectionData?.name}</h1>
            <Link to={`/ArtPreview/${CollectionNfts[0]?.id}`}>
                <Button classes="button3 bg-white">
                    See The Collection
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </Link>
        </article>
    )
}
// --------------------//





function getCollection(collectionId: string) {
    const CollectionData = CollectionArray.find(collection => collection.id == collectionId)//liquify collection 

    const CollectionNfts = CollectionData?.ArtsInCollection.map(nftId => {
        return ArtsFunctions.readById(nftId)
    })

    return ({ CollectionData, CollectionNfts })
}