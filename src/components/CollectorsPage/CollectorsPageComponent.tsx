import { ReactNode ,useRef, useState} from "react";
import './sass/CollectorsPageComponent.css'
import { IUserNoPriorityData, ProfileFunctions } from "../../scripts/usersFunction";
import { CollectorCard } from "../others/CollectorsCard/CollectorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export default function CollectorsPageComponent():ReactNode{    
    const defaultCollectorsList = ProfileFunctions.read()
    const [collectorsListToRender ,setCollectorsListToRender] = useState<IUserNoPriorityData[]| undefined>(defaultCollectorsList)
    const $SearchInput= useRef<null | HTMLInputElement>(null)
    function Filter(inputValue:string){
        
        if(inputValue.trim() == ""){
            setCollectorsListToRender(defaultCollectorsList)
            return
        }

        let newCollectorListToRender:IUserNoPriorityData[] = []

        defaultCollectorsList?.forEach((collectorData)=>{
            if(collectorData.name.toLowerCase().trim().includes(inputValue.trim().toLowerCase())){
                newCollectorListToRender.push(collectorData)
            }
        }) 
        setCollectorsListToRender(newCollectorListToRender)


        

    }
    
    
    return(
        <main className='collectorCardPageMainContainer'>
        <div className="searchBarContainer">
            <FontAwesomeIcon icon={faSearch} />
            <input className="searchBar" type="text" ref={$SearchInput} onChange={(e)=>Filter(e.target.value)}></input>
        </div>
        <section className="collectorCardsContainer">
            {
                collectorsListToRender?.map((collectorData)=>{
                    return <CollectorCard id={collectorData.id}/>
                })
            }
        </section>
        </main>
    )
}