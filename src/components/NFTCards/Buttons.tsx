import { ReactNode } from "react";

interface IButton {
    buttonFilter : string
    selectedFilter:string
    setSelectedFilter: (buttonFilter:string) => void 
}

export default function FilterButton({buttonFilter,setSelectedFilter, selectedFilter}:IButton):ReactNode{
    return(
        <li>
            {selectedFilter == buttonFilter?<div className='buttonBackground'></div>:null}
            <button onClick={() =>setSelectedFilter(buttonFilter)} className={`NavButton ${selectedFilter == buttonFilter?('NavButtonSelected'):(null)}`}>{buttonFilter}</button>
            
        </li>
    )
}