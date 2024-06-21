import { UseGetUserData, UseGetUsersList, UseSetUserData } from "../hooks/useUserList"
import { IArtObject } from "../utils/ArtsArray"
const defaultBannerPath = 'https://i.pinimg.com/564x/5b/49/40/5b49401dc966cd8599607b88fc557e5e.jpg'

export interface IUser {
    name: string
    email: string
    id?: string
    password: string
    imgPath?: string
    bannerPath?: string
    bio?: string
    userNFTIdCollection?: IArtObject[]
}

class user {
    name: string
    email: string
    id?: string
    password: string
    imgPath?: string
    bannerPath?: string
    bio?: string
    userNFTIdCollection: IArtObject[]

    constructor({ name, email, id, password, imgPath, bannerPath = defaultBannerPath}: IUser) {
        this.name = name
        this.email = email
        this.id = id
        this.password = password
        this.imgPath = imgPath
        this.bannerPath = bannerPath
        this.userNFTIdCollection = []
    }

}

export function Register(props: IUser): number | undefined {

    const { name, email, id, password, imgPath } = props
    console.log('teste')
    if (localStorage.CyberNFTUsers) {
        let Users = UseGetUsersList()

        if (Users != undefined) {
            let isUserRegistred = UseGetUserData({getBy: 'email', stringParameterValue: email })
            console.log(isUserRegistred)
            if (isUserRegistred == null) {
                // Users.push(new user({ name, email, id, password, imgPath }))
                UseSetUserData(new user({ name, email, id, password, imgPath }))
                return Login(props)

            } else { console.log('Email ja cadastrado') }
        }
    } else {
        let Users = [new user({ name, email, id, password, imgPath })]
        localStorage.setItem("CyberNFTUsers", JSON.stringify(Users))
        return Login(props)
    }
}

export function Login(props: IUser): number {

    var SelectedUser: number = -1

    if (localStorage.CyberNFTUsers) {
        let Users = UseGetUsersList()
        if (Users != null) {
            SelectedUser = Users.findIndex((userData: IUser) => {
                return userData.email === props.email && userData.password === props.password
            })
            console.log(SelectedUser)

        }
    }
    return SelectedUser
}