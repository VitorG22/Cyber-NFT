import { ReactNode, useEffect, useState } from "react";
import { Button } from "../others/buttons/buttons";
import { ArtArray, IArtObject } from "../../utils/ArtsArray";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import './sass/artShowStyle.css'
import { CollectionArray, ICollectionArray } from "../../utils/CollectionArray";
import ImgThumbnail from "./imgThumbnail";
import NFTCardPage from "../NFTCards/NFTCardPage";
import { Collectors } from "../topCollectors/CollectorsArray";
import { toast } from "sonner";
import { ToastElement } from "../others/toast/toast";

export default function ({ id }: { id: string }): ReactNode {
    const selectedArt: IArtObject | undefined = ArtArray.find((art) => { return art.id == id })
    const collectionSelected: ICollectionArray | undefined = (
        CollectionArray.find((collection) => {
            return collection.id == selectedArt?.collectionId
        })
    )

    const [selectedCollectorIndex, setSelectedCollectorIndex] = useState(-1)
    useEffect(() => {
        setSelectedCollectorIndex(Collectors.findIndex((element) => {
            return element.id == "AA004"
        }))
    }, [])



    return (
        <>
            <section id="ArtShowPage">
                <section className="imgContainer">
                    <img src={`../${selectedArt?.path}`} />
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
                            <div className='ownerCard'>
                                <p className='OwnerText'>Owner: </p>
                                <div>
                                    <p className='ownerName'>{Collectors[selectedCollectorIndex]?.name}</p>
                                    <div className='ownerImgContainer'><img className='ownerImg' key={"AA004"} src={`../${Collectors[selectedCollectorIndex]?.imgPath}`} /></div>
                                </div>
                            </div>
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
                        <div className="buttonContainer">
                            <Button classes='button1 bg-white  gap-1 text-black text-500' content="Add to Cart" handleClickFunction={() =>toast(
                            <ToastElement 
                                title="Ahh..."
                                description='Where did I leave my cart?'
                                showButton= {false} 
                                handleFunction={()=>{}}
                            />)}>
                            
                                <FontAwesomeIcon icon={faCartShopping} color="#000" />
                            </Button>
                            <p>{selectedArt?.EHT_price} Eth</p>
                        </div>
                    </section>
                </div>
            </section>
            <NFTCardPage title="More like this" searchBar={false} showFilter={false} filter={selectedArt?.filterSearch[1]} pathStart="../" />
        </>
    )
}