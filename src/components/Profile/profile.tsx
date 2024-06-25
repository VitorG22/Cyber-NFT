import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Sass/profile.css'
import NFTCardPage from '../NFTCards/NFTCardPage';
import { ProfileFunctions } from '../../scripts/usersFunction';
import { useAppContext } from '../../hooks/useAppContext';
import Modal from '../others/modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import DropArea from '../others/dropAreaInput/dropArea';

export default function Profile(): ReactNode {
    const [isConnectedUserPage, seConnectedUserPage] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const { logedUserData } = useAppContext()
    let ProfileIdInTypeNumber: number

    let { ProfileId } = useParams()
    if (ProfileId) { ProfileIdInTypeNumber = parseInt(ProfileId) }
    let ProfilesList = ProfileFunctions.read()
    let ProfileData = ProfilesList?.find(profile => profile.id == ProfileIdInTypeNumber)

    const [profileNameInputValue, setProfileNameInputValue] = useState<string | undefined>(ProfileData?.name)
    const [profileBioInputValue, setProfileBioInputValue] = useState<string | undefined>(ProfileData?.profileBiography)
    const [profileImageInputValue, setProfileImageInputValue] = useState<string | undefined | ArrayBuffer>(ProfileData?.profileImage)
    const [profileBannerInputValue, setProfileBannerInputValue] = useState<string | undefined | ArrayBuffer>(ProfileData?.profileBanner)

    useEffect(() => {

        if (logedUserData?.id == ProfileIdInTypeNumber) {
            seConnectedUserPage(true)
        }
    }, [])


    function HandleUpdateUserData() {
        if (!logedUserData) return

        if (!profileNameInputValue || !profileBannerInputValue || !profileImageInputValue) return

        ProfileFunctions.update({
            idToUpdate: logedUserData.id,
            newProfileData: {
                ...logedUserData,
                name: profileNameInputValue,
                profileBanner: `${profileBannerInputValue}`,
                profileBiography: profileBioInputValue || "",
                profileImage: `${profileImageInputValue}`,
            }
        })
        setIsEditModalOpen(false)
    }

    function handleCancelModalButtonClick() {
        setIsEditModalOpen(false)

        // define os valores dos inputs para as informações da conta
        setProfileNameInputValue(ProfileData?.name)
        setProfileBioInputValue(ProfileData?.profileBiography)
        setProfileImageInputValue(ProfileData?.profileImage)
        setProfileBannerInputValue(ProfileData?.profileBanner)
    }

    return (
        <>
            <main className='profilePageContainer'>
                <section className='banner'>
                    <div className='bannerBackgroundImgContainer'>
                        <img className='bannerBackgroundImg' src={ProfileData?.profileBanner} alt='' srcSet='' />
                    </div>
                </section>
                <section className='profileDataContainer'>
                    <div className='ProfileImgContainer' >
                        <img src={ProfileData?.profileImage} className='ProfileImg' key={`BannerPicture_${ProfileData?.profileImage} `} />
                    </div>
                    <article className='profileArticle'>
                        <ul className='profileButtonsList'>
                            {isConnectedUserPage ? (<li>
                                <button
                                    className='profileButton'
                                    onClick={() => setIsEditModalOpen(true)}>
                                    <FontAwesomeIcon size='sm' icon={faPen} />
                                    <p className='buttonText'>Edit Profile</p>
                                </button>
                            </li>) : (
                                <>
                                    <li>
                                        <button className='profileButton'>
                                            <FontAwesomeIcon size='sm' icon={faPlus} />
                                            <p className='buttonText'>follow</p>
                                        </button>
                                    </li>
                                    <li>
                                        <button className='profileButton'>
                                            <FontAwesomeIcon size='sm' icon={faExclamation} />
                                            <p className='buttonText'>Report</p>
                                        </button>
                                    </li>
                                </>
                            )
                            }
                        </ul>
                        <h2 className='profileName'>
                            {ProfileData?.name}
                        </h2>
                        <h4 className='profileBio'>
                            {ProfileData?.profileBiography}
                        </h4>
                    </article>
                </section>
                <NFTCardPage title={`${ProfileData?.name} Collection`} isProfileCollectionRender={true} profileCollectionToRender={ProfileData?.profileNftCollection} searchBar={false} showFilter={false} />

            </main>
            {isEditModalOpen &&
                <Modal handleFunction={setIsEditModalOpen}>
                    <div className='modalContentContainer'>
                        <section id='modalProfileCard' className='modalProfileCard'>
                            <img className='modalProfileCardBanner' src={`${profileBannerInputValue}`} />
                            <div className='modalProfileCardDataContainer'>

                                <img className='modalProfileCardImg' src={`${profileImageInputValue}`} />
                                <article className='modalProfileCardArticle'>
                                    <h3 className='modalProfileCardName' id='modalProfileCardName'>{profileNameInputValue}</h3>
                                    <h4 className='modalProfileCardBio' id='modalProfileCardBio'>{profileBioInputValue}</h4>
                                </article>
                            </div>
                        </section>
                        <form id="ModalForm" className='ModalForm' action="">
                            <ul>
                                <li>
                                    <label htmlFor='ModalNameInput' className='modalInputLabel'>Name</label>
                                    <input
                                        type='text'
                                        id='ModalNameInput'
                                        className='modalInput'
                                        defaultValue={ProfileData?.name}
                                        onChange={(e) => setProfileNameInputValue(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label htmlFor='ModalBioInput' className='modalInputLabel'>Biography</label>
                                    <input
                                        type='text'
                                        id='ModalBioInput'
                                        className='modalInput'
                                        defaultValue={ProfileData?.profileBiography}
                                        onChange={(e) => setProfileBioInputValue(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <DropArea labelText="Image" FunctionToSetFilePath={setProfileImageInputValue} />
                                </li>
                                <li>
                                    <DropArea labelText="Banner" FunctionToSetFilePath={setProfileBannerInputValue} />
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div className='modalButtonsContainer'>
                        <button id='ModalCancelButton' className='modalCancelButton modalButton' onClick={() => handleCancelModalButtonClick()}>cancel</button>
                        <button
                            id='ModalConfirmButton'
                            className='modalConfirmButton modalButton'
                            onClick={() => HandleUpdateUserData()}
                        >confirm</button>
                    </div>
                </Modal>
            }
        </>

    )
}