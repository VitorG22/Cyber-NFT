import { ReactNode } from 'react'
import { Collectors, ICollectors } from '../../topCollectors/CollectorsArray'
import './sass/collectorCardStyle.css'

export function CollectorCard({ id, showRankPosition,showMoneyValue }: { id: string, showRankPosition: boolean, showMoneyValue:boolean }): ReactNode {
    const selectedCollector: ICollectors | undefined = (
        Collectors.find((collectorObject) => {
        return collectorObject.id == id
    })
)

    return (
        <li className="CollectorCard">
            {showRankPosition && <p>{selectedCollector?.rankPosition}.</p>}
            <div className='cardImgContainer'><img src={`/${selectedCollector?.imgPath}`} alt="" /></div>
            <span>
                <h4>{selectedCollector?.name}</h4>
                {showMoneyValue && <p>${selectedCollector?.value}</p>}
            </span>
        </li>
    )
}