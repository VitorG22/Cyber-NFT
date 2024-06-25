import { faArrowRight, faCartShopping, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './sass/cart.css'
import { useState } from "react";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { ArtsFunctions } from "../../../scripts/artsFunctions";
import { ProfileFunctions } from "../../../scripts/usersFunction";
import { useAppContext } from "../../../hooks/useAppContext";
import Modal from "../modal/modal";

export default function Cart() {
    const [isSideCartSectionOpen, setIsSideCartSectionOpen] = useState<boolean>(false)
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false)

    const { logedUserData, setLogedUserData } = useAppContext()
    let totalPrice = 0
    logedUserData?.cart.forEach((nftId) => {
        let artPrice = ArtsFunctions?.readById(nftId)?.EHT_price
        if (!artPrice) return
        totalPrice += artPrice
    })

    function purchase(){
        // fecha ambos os submenus abertos 
        setIsSideCartSectionOpen(false)
        setIsPurchaseModalOpen(false)
        if(!logedUserData) return
        
        // Atualiza o perfil do usuario logado
        let newProfileNftCollection = [...logedUserData.profileNftCollection , ...logedUserData.cart]
        const newConnectedProfileData = {
                ...logedUserData, 
                cart: [],
                profileNftCollection: newProfileNftCollection 
                
            }
        ProfileFunctions.update({
            idToUpdate: logedUserData.id,
            newProfileData: newConnectedProfileData
        })
        setLogedUserData(newConnectedProfileData)

        // Atualiza o perfil do usuario que possuia a arte
        const profilesList = ProfileFunctions.read()
        logedUserData.cart.forEach(nftId=>{
            const exNftOwner = profilesList?.find(profile=>{
                return profile.profileNftCollection.includes(nftId)
            })
            if(exNftOwner){
                ProfileFunctions.update({
                    idToUpdate: exNftOwner.id,
                    newProfileData:{
                        ...exNftOwner,
                        profileNftCollection : exNftOwner.profileNftCollection.filter(ExOwnerNftId=>ExOwnerNftId != nftId ) 
                    }
                })
            }
        })
    }

    return (
        <>
            {isSideCartSectionOpen ? (
                <>
                    <div className="backgroundLayer" onClick={() => setIsSideCartSectionOpen(false)}></div>
                    <div className="sideCartSectionContainer">
                        <button className='cartButton cartArrowButton' onClick={() => setIsSideCartSectionOpen(false)}>
                            <FontAwesomeIcon icon={faArrowRight} />

                        </button>
                        <section className='itemsContainer'>
                            {logedUserData?.cart.map((nftId) => {
                                return <CartItemCard key={`Item_Card_Id_${nftId}`} nftId={nftId} />
                            })}

                        </section>
                        <footer className='sideCartSectionFooter'>
                            <p className='totalPrice'>
                                {totalPrice}
                                <FontAwesomeIcon size="sm" icon={faEthereum} />
                            </p>
                            <button className='purchaseButton' onClick={() => setIsPurchaseModalOpen(true)}>Continue Purchase</button>
                        </footer>

                    </div>
                    {isPurchaseModalOpen &&
                        <Modal handleFunction={setIsPurchaseModalOpen}>
                            <p className='purchaseModalText'>Are you sure you want to complete the purchase?</p>
                            <ul className='purchaseModalButtonsContainer'>
                                <li><button className='purchaseModalKeepLookingButton' onClick={() => setIsPurchaseModalOpen(false)}>Keep Looking</button></li>
                                <li><button className='purchaseModalBuyButton' onClick={purchase}>Purchase</button></li>
                            </ul>
                        </Modal>
                    }
                </>

            ) : (
                <button className='cartButton' onClick={() => setIsSideCartSectionOpen(true)}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            )
            }
        </>

    )
}

function CartItemCard({ nftId }: { nftId: string }) {
    const { logedUserData, setLogedUserData } = useAppContext()

    const nftData = ArtsFunctions.readById(nftId)
    if (!nftData) { return }

    const collectorsList = ProfileFunctions.read()
    const nftOwner = collectorsList?.find(collector => {
        return collector.profileNftCollection.includes(nftId)
    })


    function removeItemFromCart({ nftId }: { nftId: string }) {
        let Cart = logedUserData?.cart || []
        if (!Cart.includes(nftId)) return
        console.log(nftId)
        let newCart = Cart.filter(ids => {
            return ids != nftId
        })
        console.log(newCart)

        if (!logedUserData) return
        ProfileFunctions.update({
            "idToUpdate": logedUserData.id,
            "newProfileData": {
                ...logedUserData, cart: newCart
            }
        })
        setLogedUserData({
            ...logedUserData, cart: newCart
        })
    }


    return (
        <div className='CartItemCard'>
            <div className='CartItemImageContainer'>
                <img className='CartItemImage' src={nftData.path} />
            </div>
            <article className='CartItemInfo'>
                <p className='CartItemName'>{nftData.ArtName} <span className="CartItemCollectionName">{nftData.collectionName}</span></p>
                <button className='CartItemDeleteButton' onClick={() => removeItemFromCart({ nftId: nftId })}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <p className='CartItemOwner'>{nftOwner?.name}</p>
                <p className='CartItemPrice'>
                    <FontAwesomeIcon size="sm" icon={faEthereum} />
                    {nftData.EHT_price}
                </p>
            </article>

        </div>
    )
}