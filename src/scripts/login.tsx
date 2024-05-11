
export interface IUser {
    name: string
    email: string
    id?: string
    password: string
    imgPath?: string
}

class user {
    name: string
    email: string
    id?: string
    password: string
    imgPath?: string

    constructor({ name, email, id, password, imgPath }: IUser) {
        this.name = name
        this.email = email
        this.id = id
        this.password = password
        this.imgPath = imgPath
    }

    public getName(): string {
        return this.name
    }

}

export function Register(props: IUser): number | undefined {

    const { name, email, id, password, imgPath } = props



    if (localStorage.CyberNFTUsers) {
        let UsersInString = localStorage.getItem("CyberNFTUsers")

        if (UsersInString != null) {
            let Users = JSON.parse(UsersInString)
            let isUserRegistred = Users.findIndex((userData:IUser)=> {return userData.email == email})
            console.log(isUserRegistred)
            if(isUserRegistred == -1){
                Users.push(new user({ name, email, id, password, imgPath }))
                localStorage.setItem("CyberNFTUsers", JSON.stringify(Users))
                return Login(props)

            }else{console.log('Email ja cadastrado')}
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
        let UsersInString = localStorage.getItem('CyberNFTUsers')
        if (UsersInString != null) {
            let Users = JSON.parse(UsersInString)
            SelectedUser = Users.findIndex((userData: IUser) => {
                return userData.email === props.email && userData.password === props.password
            })
            console.log(SelectedUser)

        }
    }
    return SelectedUser
}