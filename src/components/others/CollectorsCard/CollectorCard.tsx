import { ReactNode, useEffect, useRef } from 'react'
import './sass/collectorCardStyle.css'
import { IUserNoPriorityData, ProfileFunctions } from '../../../scripts/usersFunction'
import { NavLink } from 'react-router-dom'

export function CollectorCard({ id }: { id: number }): ReactNode {
    const selectedCollector: IUserNoPriorityData | undefined = (
        ProfileFunctions.read()?.find((collectorObject) => {
        return collectorObject.id == id
    })
)

// move a pagina até o top apos o usuario clicar no card de um colecionador
    useEffect(()=>{
        document.getElementById(`collectorCard${id}`)?.addEventListener("click",()=>{
            window.scrollTo({
                top: 0,
                behavior:'smooth'
            })
        })
    },[])


    return (
        
        <NavLink id={`collectorCard${id}`} to={`/ProfilePage/${selectedCollector?.id}`} className="CollectorCard">
            <img className='cardBanner' src={selectedCollector?.profileBanner}/>
            <div className='cardImgContainer'><img src={selectedCollector?.profileImage} alt="" /></div>
            <span>
                <h4>{selectedCollector?.name}</h4>
            </span>
        </NavLink>
    )
}