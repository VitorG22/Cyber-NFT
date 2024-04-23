import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import ArtShow from "../components/ArtShow/ArtShow";

export default function ArtShowPage(): ReactNode {
    const { id } = useParams()

    return (
        <>
            {id != undefined && <ArtShow id={id} />}
        </>
    )
} 