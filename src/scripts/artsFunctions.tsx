import { ArtArray } from "../utils/ArtsArray"

export const ArtsFunctions = {
    readAll(){
        try{
            return ArtArray
        }catch (error){
            return []
        }
            
    },
    readById(ArtId:string){
        const selectedArt = ArtArray.find(ArtData =>{
            return ArtData.id == ArtId
        })
        return selectedArt
    }

}