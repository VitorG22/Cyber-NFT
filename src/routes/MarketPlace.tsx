import { ReactNode } from "react";
import NFTCardPage from "../components/NFTCards/NFTCardPage";

export default function MarketPlace():ReactNode{
    return(
        <section>
            <NFTCardPage showFilter={true} title="ArtWorks" searchBar={true} />
        </section>
    )
}