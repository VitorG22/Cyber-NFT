import { ReactNode } from "react";
import './sass/topCollectorsStyle.css'
// import { Collectors } from "./CollectorsArray";
import { CollectorCard } from "../others/CollectorsCard/CollectorCard";
import { ProfileFunctions } from "../../scripts/usersFunction";

export default function TopCollectors(): ReactNode {
    let collectors = ProfileFunctions.read()
    collectors = collectors?.slice(0,12)
    return (
        <section id="TopCollectorsPage">
            <main>
                <h2>Top Collectors<br />Over LastWeek</h2>
                    <ul>
                        {collectors?.map((collectorData) => {
                            return (
                                <li>
                                    <CollectorCard key={collectorData.id} id={collectorData.id}/>
                                </li>
                            )
                        })}
                    </ul>
            </main>
        </section>
    )
}
