import { ReactNode, useEffect, useState } from "react";
import { Button } from "../others/buttons/buttons";
import { ArtArray, IArtObject } from "../../utils/ArtsArray";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import './sass/artShowStyle.css'
import { CollectionArray, ICollectionArray } from "../../utils/CollectionArray";
import ImgThumbnail from "./imgThumbnail";
import NFTCardPage from "../NFTCards/NFTCardPage";
import { ProfileFunctions } from "../../scripts/usersFunction";
import { useAppContext } from "../../hooks/useAppContext";
import { toast } from "sonner";
import { ToastElement } from "../others/toast/toast";

export default function ({ id }: { id: string }): ReactNode {
    const { logedUserData } = useAppContext()
    const [isArtInCart, setIsArtInCart] = useState<boolean>(false)
    const [isArtInUserCollection, setIsArtInUserCollection] = useState<boolean >(false)
    const selectedArt: IArtObject | undefined = ArtArray.find((art) => { return art.id == id })
    const collectionSelected: ICollectionArray | undefined = (
        CollectionArray.find((collection) => {
            return collection.id == selectedArt?.collectionId
        })
    )
    const selectedArtOwner = ProfileFunctions.read()?.find((collectorData) => {
        return collectorData.profileNftCollection.includes(id)
    })

    useEffect(()=>{
        setIsArtInCart(logedUserData?.cart.includes(id) || false)
        setIsArtInUserCollection(logedUserData?.profileNftCollection.includes(id) || false)
    },[id])

    useEffect(()=>{
        window.scrollTo({top:0, behavior: "smooth"})
    },[])


    function AddItemToCart({ nftId }: { nftId: string }) {
        if (!logedUserData) { return }
        let newCart = logedUserData?.cart || []
        if (newCart.includes(nftId)) { return }
        newCart.push(nftId)

        ProfileFunctions.update({
            "idToUpdate": logedUserData.id,
            "newProfileData": {
                ...logedUserData, cart: newCart
            }
        })
        setIsArtInCart(true)
    }


    return (
        <>
            {selectedArt && logedUserData ? (
                <section id="ArtShowPage">
                    <section className="imgContainer">
                        <img src={`${selectedArt?.path}`} />
                    </section>
                    <div className="imgDataContainer">
                        {collectionSelected &&
                            <div className='collectionContainer'>
                                <p className='CollectionName' >{collectionSelected?.name} collection</p>
                                <div className="collectionImagesContainer">
                                    {
                                        collectionSelected?.ArtsInCollection.map((artId): ReactNode => {
                                            return (
                                                <ImgThumbnail artId={artId} />
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        }
                        <section>
                            <div className="CartCardTop">
                                <h2>{selectedArt?.ArtName}</h2>
                                {selectedArtOwner && <div className='ownerCard'>
                                    <p className='OwnerText'>Owner: </p>
                                    <div>
                                        <p className='ownerName'>{selectedArtOwner.name}</p>
                                        <div className='ownerImgContainer'><img className='ownerImg' key={"AA004"} src={selectedArtOwner.profileImage} /></div>
                                    </div>
                                </div>}
                            </div>
                            <span className='idContainer'>
                                <p>Id:</p>
                                <h5>#{selectedArt?.id}</h5>
                            </span>
                            {selectedArt?.collectionName && (
                                <span className='collectionInfoContainer'>
                                    <p>Collection:</p>
                                    <h5>{selectedArt?.collectionName}</h5>
                                </span>
                            )}
                            {!isArtInUserCollection &&
                                <div className="buttonContainer">

                                    {isArtInCart ? (
                                        <Button classes='button3 bg-white  gap-1 text-black text-500' content="Already in cart"></Button>
                                    ) : (
                                        <>
                                            <Button classes='button3 bg-white  gap-1 text-black text-500' content="Add to Cart"
                                                handleClickFunction={() => {
                                                    AddItemToCart({ "nftId": selectedArt.id })
                                                    toast(<ToastElement
                                                        title=""
                                                        description={`${selectedArt.ArtName} added to cart`}
                                                        showButton={false}
                                                    />)
                                                }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faCartShopping} color="#000" />
                                            </Button>
                                            <p>{selectedArt?.EHT_price} Eth</p>
                                        </>
                                    )
                                    }
                                </div>
                            }
                        </section>
                    </div>
                </section>
            ) : (
                <p>No Art Selected</p>
            )
            }
            <NFTCardPage title="More like this" searchBar={false} showFilter={false} filter={selectedArt?.filterSearch[1]} />
        </>
    )
}