import { Md5 } from "ts-md5"
import { defaultUsersList } from "../utils/UserArray"

interface IUserAllData {
    id: number,
    name: string,
    email: string,
    passwordHash: string,
    profileImage: string ,
    profileBanner: string,
    profileBiography: string,
    profileNftCollection: Array<string>,
    cart: Array<string>,
    userWallet: number
}
export interface IUserNoPriorityData {
    id: number,
    name: string,
    profileImage: string,
    profileBanner: string,
    profileBiography: string,
    profileNftCollection: Array<string>
    cart: Array<string>
    userWallet: number
}


export function initUsersFunctions() {
    if (!localStorage.getItem("CyberNftUsers")) {
        localStorage.setItem("CyberNftUsers", JSON.stringify(defaultUsersList))
    }
}


export const ProfileFunctions = {
    create(newProfile: { ProfileName: string, ProfileEmail: string, ProfilePassword: string, ProfileImage: string }) {
        const { ProfileName, ProfileEmail, ProfilePassword, ProfileImage = "DefaultProfileImageURL" } = newProfile
        let ProfilesList: Array<IUserAllData> | undefined = ProfileFunctions.readAll()

        if (!ProfilesList) {
            return { "loginStatus": false, "content": { "userData":null,"error": "User list not found" } }
        }
        if (-1 != ProfilesList.findIndex(profile => profile.email == ProfileEmail.trim())) {
            return { "loginStatus": false, "content": { "userData":null,"error": "Email already registered" } }
        }

        var nextId: number = 0
        if (ProfilesList.length > 0) {
            nextId = ProfilesList[ProfilesList.length - 1].id + 1
        }

        ProfilesList.push({
            "id": nextId,
            "name": ProfileName.trim(),
            "email": ProfileEmail.trim(),
            "passwordHash": HashGenerator(ProfilePassword.trim()),
            "profileImage": ProfileImage,
            "profileBanner": 'https://i.pinimg.com/564x/cb/f6/0e/cbf60e0243e8a0b08cea6c3fbd3dc330.jpg',
            "profileBiography": "",
            "profileNftCollection":[],
            "cart": [],
            "userWallet": 127
        })

        setCyberNftUsers(ProfilesList)
        const loginReturn = ProfileFunctions.login({
            ProfileEmail: ProfileEmail,
            ProfilePassword: ProfilePassword
        })
        return loginReturn

    },
    update(props: { idToUpdate: number, newProfileData: IUserNoPriorityData }) {
        const { idToUpdate, newProfileData } = props


        const ProfilesList: Array<IUserAllData> | undefined = ProfileFunctions.readAll()
        if (!ProfilesList) {
            return
        }
        const selectedUserToUpdate = ProfilesList?.find((profile) => profile.id == idToUpdate)
        const selectedUserToUpdateIndex: number = ProfilesList.findIndex((profile) => profile.id == idToUpdate)

        if (!selectedUserToUpdate) {
            console.log("Update block")
            return
        }

        ProfilesList[selectedUserToUpdateIndex] = {
            "id": selectedUserToUpdate.id,
            "name": newProfileData.name,
            "email": selectedUserToUpdate.email,
            "passwordHash": selectedUserToUpdate.passwordHash,
            "profileImage": newProfileData.profileImage,
            "profileBanner": newProfileData.profileBanner,
            "profileBiography": newProfileData.profileBiography,
            "profileNftCollection":newProfileData.profileNftCollection,
            "cart": newProfileData.cart,
            "userWallet": newProfileData.userWallet
        }
        setCyberNftUsers(ProfilesList)

        console.log("Profile Updated")

    },
    delete({ id }: { id: number }) {
        const ProfilesList: Array<IUserAllData> | undefined = ProfileFunctions.readAll()
        if (!ProfilesList) {
            return
        }

        const newProfilesList = ProfilesList.filter((profile) => {
            return profile.id != id
        })
        setCyberNftUsers(newProfilesList)
    },
    read() {
        const CyberNftUsersList = localStorage.getItem('CyberNftUsers')
        if (!CyberNftUsersList) { return }

        const ProfilesList: Array<IUserAllData> = JSON.parse(CyberNftUsersList)
        const newProfileList: Array<IUserNoPriorityData> = []

        ProfilesList.forEach(profile => {
            const { id, name, profileBanner, profileBiography, profileImage ,profileNftCollection, cart, userWallet } = profile
            newProfileList.push({
                id: id,
                name: name,
                profileBanner: profileBanner,
                profileBiography: profileBiography,
                profileImage: profileImage,
                profileNftCollection: profileNftCollection,
                cart: cart,
                userWallet: userWallet
            })
        })
        return newProfileList

    },
    readAll() {
        const CyberNftUsersList = localStorage.getItem('CyberNftUsers')
        if (!CyberNftUsersList) { return }

        const ProfilesList: Array<IUserAllData> = JSON.parse(CyberNftUsersList)
        return ProfilesList

    },
    login({ ProfileEmail, ProfilePassword }: { ProfileEmail: string, ProfilePassword: string }) {
        const ProfilesList: Array<IUserAllData> | undefined = ProfileFunctions.readAll()
        if (!ProfilesList) {
            return { 
                "loginStatus": false,
                "content": {
                    "userData":null,
                    "error": "User list not found" } 
                }
        }

        const selectedProfileIndex = ProfilesList.findIndex((profile) => profile.email == ProfileEmail.trim())
        if (selectedProfileIndex == -1) {
            return { 
                "loginStatus": false,"content": {"userData":null,"error": "Incorrect email" } 
                }
        }
        if (ProfilesList[selectedProfileIndex].passwordHash != HashGenerator(ProfilePassword.trim())) {
            return { 
                "loginStatus": false,"content": {"userData":null,"error": "Incorrect password" } 
                }
        }
        const selectedProfile = ProfileFunctions.read()
        if (!selectedProfile) {
            return { 
                "loginStatus": false,"content": {"userData":null,"error": "User list not found" } 
                }
        }
        return {
            "loginStatus": true,
            "content": {
                "userData": selectedProfile[selectedProfileIndex],
                "error": ""
            }
        }
    }

}

function HashGenerator(text: string) {
    return Md5.hashStr(text)
}

function setCyberNftUsers(newCyberNftUsersList: Array<IUserAllData>) {
    localStorage.setItem("CyberNftUsers", JSON.stringify(newCyberNftUsersList))
}

