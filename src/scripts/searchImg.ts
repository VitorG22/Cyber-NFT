import { IArtObject } from "../utils/ArtsArray"
import { ArtArray } from "../utils/ArtsArray"

export default function searchImg(id: string): IArtObject| undefined {
    const artObject: IArtObject|undefined = ArtArray.find((element) => {
        return element.id == id
    })
    return artObject
}

