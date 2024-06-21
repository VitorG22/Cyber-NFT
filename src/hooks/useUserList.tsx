import { IUser } from "../scripts/login"

export function UseGetUsersList() {
    var UsersList = localStorage.getItem("CyberNFTUsers")
    if (UsersList) {
        return JSON.parse(UsersList)
    }
}


export function UseGetUserData(props: { getBy: 'email' | 'index' | 'name', stringParameterValue?: string, indexParameterValue?: number }) {
    let UsersList: IUser[] = UseGetUsersList()
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
        case "index":
            if (props.indexParameterValue != null) {
                if (0 <= props.indexParameterValue && props.indexParameterValue <= UsersList.length) {
                    valueToReturn = UsersList[props.indexParameterValue]
                }
            }
            break
        default:
            valueToReturn = undefined

    }
    console.log(valueToReturn)
    return valueToReturn
}



export function UseSetUserData(UserData: IUser, index?: number) {
    let UsersList: IUser[] = UseGetUsersList()

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

