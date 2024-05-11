import NFTCardPage from "../components/NFTCards/NFTCardPage";
import OfferPage from "../components/Offer/OfferPage";
import HomeComponent from "../components/homeSection/homeComponent";
import KnowMore from "../components/knowMore/KnowMoreComponent";
import HorizontalBar from "../components/others/horizontalBar/HorizontalBar";
// import SubscribComponent from "../components/subscribe/SubscribCompnent";
import TopCollectors from "../components/topCollectors/topCollectorPage";

export default function HomePage() {

    return (
        <>
            <HomeComponent />
            <KnowMore />
            <HorizontalBar />
            <NFTCardPage searchBar={false} title="ArtWorks" showFilter={true} imagesCount={10} />
            <OfferPage />
            <TopCollectors />
            {/* <SubscribComponent /> */}
        </>
    )
}
