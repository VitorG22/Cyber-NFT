import { ReactNode, useState, useEffect, lazy, Suspense } from "react";
import './sass/NFTCardsStyle.css'
import FilterButton from "./Buttons";
import { ArtArray, IArtObject } from '../../utils/ArtsArray'
// import LightsBackground from "../others/AnimatedBackground/animatedBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import LightsBackground from "../others/AnimatedBackground/animatedBackground";
const NFTCard = lazy(() => import('./NTFCard'))

interface INFTCardPage {
    imagesCount?: number
    title: string
    showFilter: boolean
    searchBar: boolean
    filter?: string
    profileCollectionToRender?: string[]
    isProfileCollectionRender?: boolean
}

export default function NFTCardPage({ searchBar, imagesCount, title, showFilter, filter = "All", profileCollectionToRender,isProfileCollectionRender }: INFTCardPage): ReactNode {
    const [selectedFilter, setSelectedFilter] = useState<string>(filter)
    const [ArtArrayForRender, setArtArrayForRender] = useState<IArtObject[]>([])
    const [searchBarValue, setSearchBarValue] = useState<string>("")
    const filters: string[] = ['All', 'Photography', 'AI Models', 'Animation', '3D Art']

    useEffect(() => {
        if (isProfileCollectionRender) {
            let ProfileCollectionArtObjects: IArtObject[] = [] 
            profileCollectionToRender?.forEach((artId)=>{
                let selectedArtObject = ArtArray.find((artObject)=>{
                    return artObject.id == artId
                })
                if(selectedArtObject) ProfileCollectionArtObjects.push(selectedArtObject)
            })

            setArtArrayForRender(ProfileCollectionArtObjects)
            return
        }

        filterArtsToRenderByInputsValues()

    }, [selectedFilter, searchBarValue])


    function filterArtsToRenderByInputsValues() {
        var filteredList = ArtArray.filter((art) => {
            return art.filterSearch.includes(selectedFilter)
        })

        filteredList = filteredList.slice(0, imagesCount)
        var listToSecondFilter = filteredList.slice()

        if (searchBarValue != '') {
            var secondFilteredList = listToSecondFilter.filter((art) => {
                return art.ArtName.includes(searchBarValue) || art.id.includes(searchBarValue)
            })
            setArtArrayForRender(secondFilteredList)
        } else {
            setArtArrayForRender(filteredList)
        }
    }


    return (
        <main id='NFTCardPage'>
            <LightsBackground />
            <nav>
                <h4>{title}</h4>
                {searchBar &&
                    <div className="InputContainer">
                        <FontAwesomeIcon icon={faSearch} />
                        <input id="SearchBar" type="text" value={searchBarValue} onChange={(e) => setSearchBarValue(e.target.value)} />
                    </div>
                }
                {showFilter &&
                    <ul>
                        {filters.map((filterName) => {
                            return (
                                <FilterButton key={`filter_button_${filterName}`} buttonFilter={filterName} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                            )
                        })}
                    </ul>
                }
            </nav>
            <section className='CardsContainer'>
                {
                    ArtArrayForRender.length > 0 ? (
                        ArtArrayForRender.map((element: IArtObject): ReactNode => {
                            return (
                                <Suspense key={`suspense_element_for_art_${element.id}`}>
                                    <NFTCard id={element.id} key={element.id} />
                                </Suspense>
                            )
                        })
                    ) : (
                        <div className="noArtsSearched">
                            <p>No art found</p>
                            <FontAwesomeIcon icon={faHeartBroken} />
                        </div>
                    )
                }
            </section>
        </main>
    )
}