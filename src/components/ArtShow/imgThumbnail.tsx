import { ReactNode } from "react";
import { IArtObject } from "../../utils/ArtsArray";
import { Link } from "react-router-dom";
import searchImg from "../../scripts/searchImg";

export default function ImgThumbnail({ artId }: { artId: string }): ReactNode {
    const art:IArtObject|undefined = searchImg(artId)

    return (
        <span className='artThumbnail'>
            <Link to={`../ArtPreview/${art?.id}`}><img src={`../${art?.path}`} /></Link>
        </span>
    )
}