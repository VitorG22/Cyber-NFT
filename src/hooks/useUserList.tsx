interface IUserAllData {
    id: number,
    name: string,
    email: string,
    passwordHash: string,
    profileImage: string ,
    profileBanner: string,
    profileBiography: string,
    profileNftCollection: Array<string>,
    cart: Array<string>
}


export function UseGetUsersList() {
    var UsersList = localStorage.getItem("CyberNFTUsers")
    if (UsersList) {
        return JSON.parse(UsersList)
    }
}



export function UseGetUserData(props: { getBy: 'id' | 'name'| "email", stringParameterValue?: string, idParameterValue?: number }) {
    let UsersList: IUserAllData[] = UseGetUsersList()
    let valueToReturn = undefined
    
    console.log(props)
    switch (props.getBy) {
        case "email":
            valueToReturn = UsersList.find((UserData) => {
                return UserData.email == props.stringParameterValue
            })
            break
        case "name":
            valueToReturn = UsersList.find((UserData) => {
                return UserData.name == props.stringParameterValue
            })
            break
        case "id":
            if (props.idParameterValue != null) {
                if (0 <= props.idParameterValue) {
                    valueToReturn = UsersList.find((user)=>user.id == props.idParameterValue)
                }
            }
            break
        default:
            valueToReturn = undefined

    }
    console.log(valueToReturn)
    return valueToReturn
}



export function UseSetUserData(UserData: IUserAllData, index?: number) {
    let UsersList: IUserAllData[] = UseGetUsersList()

    // if executado caso o index corresponda a um usuario da lista
    if (index && index <= UsersList.length) {
        UsersList[index] = UserData
    }
    // if executado caso o index não corresponda a um usuario da lista
    else {
        UsersList.push(UserData)
    }
    localStorage.setItem("CyberNFTUsers", JSON.stringify(UsersList))
}

