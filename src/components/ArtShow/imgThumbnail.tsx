import { ReactNode } from "react";
import { ArtArray } from "../../utils/ArtsArray";
import { Link } from "react-router-dom";

export default function ImgThumbnail({ artId }: { artId: string }): ReactNode {
    const art = ArtArray.find((artElement) => {
        return artElement.id == artId
    })

    return (
        <span className='artThumbnail'>
            <Link to={`/ArtPreview/${art?.id}`}><img src={`/${art?.path}`} /></Link>
        </span>
    )
}