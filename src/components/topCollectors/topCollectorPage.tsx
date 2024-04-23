import { ReactNode } from "react";
import './sass/topCollectorsStyle.css'
import { Collectors } from "./CollectorsArray";
import { CollectorCard } from "../others/CollectorsCard/CollectorCard";

export default function TopCollectors(): ReactNode {
    return (
        <section id="TopCollectorsPage">
            <main>
                <h2>Top Collectors<br />Over LastWeek</h2>
                    <ul>
                        {Collectors.map((collectorData) => {
                            return (
                                // <CollectorCard rankPosition={collectorData.rankPosition} imgPath={collectorData.imgPath} value={collectorData.value} name={collectorData.name} />
                                <CollectorCard id={collectorData.id} showRankPosition={true} showMoneyValue={true}/>
                            )
                        })}
                    </ul>
            </main>
        </section>
    )
}
