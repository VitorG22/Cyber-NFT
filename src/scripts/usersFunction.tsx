import { Md5 } from "ts-md5"

interface IUserAllData {
    id: number,
    name: string,
    email: string,
    passwordHash: string,
    profileImage: string ,
    profileBanner: string,
    profileBiography: string,
    profileNftCollection: Array<string>
}
export interface IUserNoPriorityData {
    id: number,
    name: string,
    profileImage: string,
    profileBanner: string,
    profileBiography: string,
    profileNftCollection: Array<string>
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
            "profileNftCollection":[]
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
            "profileNftCollection":newProfileData.profileNftCollection
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
            const { id, name, profileBanner, profileBiography, profileImage ,profileNftCollection } = profile
            newProfileList.push({
                id: id,
                name: name,
                profileBanner: profileBanner,
                profileBiography: profileBiography,
                profileImage: profileImage,
                profileNftCollection: profileNftCollection
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
    // return createHash('sha256').update(text).digest('hex')
    return Md5.hashStr(text)
    // Md5.hashStr(JSON.stringify(yourObject))
}

function setCyberNftUsers(newCyberNftUsersList: Array<IUserAllData>) {
    localStorage.setItem("CyberNftUsers", JSON.stringify(newCyberNftUsersList))
}


const defaultUsersList:IUserAllData[] = [
    
{
    email: "DataDyna@gmail.com",
    id: 1, 
    name: 'DataDyna', 
    passwordHash: "b4294wsl80387ad8sdf8slwo8574d57c", 
    profileBanner: "https://i.pinimg.com/736x/74/a9/dd/74a9dd3910e587f4997e6edab8296b31.jpg",
    profileBiography: "", 
    profileImage: 'https://i.pinimg.com/236x/49/5e/ef/495eef3708490fddd605cb810277c2b5.jpg', 
    profileNftCollection: ["BA03","BA08","GB07","GB02","GB03","DB03"],
},
{
    email: "ByteBend@gmail.com",
    id: 2, 
    name: 'ByteBend', 
    passwordHash: "b82o4wsl803871dcwsfhslwo8cmap27c", 
    profileBanner: "https://i.pinimg.com/originals/18/3d/a8/183da8a49597943f6b8c70f2876c51eb.gif",
    profileBiography: "look at the sky, contemplate its beauty", 
    profileImage: 'https://i.pinimg.com/564x/c5/2d/25/c52d2577b3bdc6e2e5b5c35966101be3.jpg', 
    profileNftCollection: ["EB07","FB03","GB06","AA01","AA00"],
},
{
    email: "ElecEdge@gmail.com",
    id: 3, 
    name: 'ElecEdge', 
    passwordHash: "b82g4wsl80y871dc2spo7lwoccm3p27c", 
    profileBanner: "https://i.pinimg.com/564x/11/88/7a/11887ae00a829526d17898709632ffd6.jpg",
    profileBiography: "", 
    profileImage: 'https://i.pinimg.com/564x/f1/b1/1a/f1b11a06a2b86887c17a8d3ed7d16749.jpg', 
    profileNftCollection: ["AA09","AA03","BA04","BA06","CA02","CA06","GB08"],
},
{
    email: "FizuKi@gmail.com",
    id: 4, 
    name: 'FizuKi', 
    passwordHash: "ad2g4wsl20j871dc2spw7lwoxck3ln7q", 
    profileBanner: "https://i.pinimg.com/564x/f1/57/7c/f1577c0e4bf8eef6cda762fdb114968a.jpg",
    profileBiography: "You handled words so well, but you were always unable to read yourself", 
    profileImage: 'https://i.pinimg.com/564x/68/71/ba/6871bab11f2773da3694407f369700b7.jpg', 
    profileNftCollection: ["DB08","DB06","DB00","EB05","FB04","GB09"],
},
{
    email: "VirtVip@gmail.com",
    id: 5, 
    name: 'VirtVip', 
    passwordHash: "xd2g4ss0t4lh71dc2spw73woxck3ln71", 
    profileBanner: "https://i.pinimg.com/564x/87/0b/ec/870bec0f2cc91af7d198da9c251cbae0.jpg",
    profileBiography: "", 
    profileImage: 'https://i.pinimg.com/564x/28/34/5f/28345fe7a912a32e57caaf39264923b3.jpg', 
    profileNftCollection: ["DB04","DB09", "CA07"],
},
{
    email: "CodeCrus@gmail.com",
    id: 6, 
    name: 'CodeCrus', 
    passwordHash: "345d63f73a504c4008bb5f84c4849a54", 
    profileBanner: "https://i.pinimg.com/564x/1d/f7/b5/1df7b5b4c9de1cd9714a82e9fd6cbb74.jpg",
    profileBiography: "Looking back might be the only way to move forward", 
    profileImage: 'https://i.pinimg.com/564x/34/5d/63/345d63f73a504c4008bb5f84c4849a54.jpg', 
    profileNftCollection: ["A002","AA08","BA00","DB02","FB01"],
},
{
    email: "NeonNom@gmail.com",
    id: 7, 
    name: 'NeonNom', 
    passwordHash: "nd2g4sd0t4lf71dc2spw43wvxck9ln7r", 
    profileBanner: "https://i.pinimg.com/564x/db/04/b7/db04b73374dd3b7f6a29d7943f96e7de.jpg",
    profileBiography: "", 
    profileImage: 'https://i.pinimg.com/564x/f3/c1/07/f3c1071a229b2219bd8b2862cd389e89.jpg', 
    profileNftCollection: ["AA07","BA01","BA07","CA05","EB00","DB01"],
},
{
    email: "CyCraze@gmail.com",
    id: 8, 
    name: 'CyCraze', 
    passwordHash: "q3rg4sd0tglc51ic2spw43wvxck90n2e", 
    profileBanner: "https://i.pinimg.com/564x/79/de/25/79de255a1d8f96be595cb79f02de300b.jpg",
    profileBiography: "success is a sum of small efforts", 
    profileImage: 'https://i.pinimg.com/736x/74/82/74/7482740e012b34b5cf61ee731715e70b.jpg', 
    profileNftCollection: ["FB05","FB02","EB03","CA04"],
},
{
    email: "DigVand@gmail.com",
    id: 9, 
    name: 'DigVand', 
    passwordHash: "s3rk4cd0ngld5cicws2w939v2ck90n2b", 
    profileBanner: "https://i.pinimg.com/564x/1e/a5/ec/1ea5ec3a3aac173852b162bc946d66e1.jpg",
    profileBiography: "", 
    profileImage: 'https://i.pinimg.com/736x/d8/f8/f1/d8f8f1cb9a3fa06669a2f26b20805050.jpg', 
    profileNftCollection: ["BA05","EB08","GB05","BA02"],
},
{
    email: "TechTina@gmail.com",
    id: 10, 
    name: 'TechTina', 
    passwordHash: "w3rk4cd0nlk55cicws2w939vlck9fn2j", 
    profileBanner: "https://i.pinimg.com/564x/2f/4a/5e/2f4a5e4e1e7c3c8e40c0d822512ddec1.jpg",
    profileBiography: "keep swimming, keep swimming, keep swimming, swim, swim...", 
    profileImage: 'https://i.pinimg.com/564x/5d/1e/53/5d1e534b4bcaea4bee2cd0b5068856c3.jpg', 
    profileNftCollection: ["GB00","FB07","FB09", "FB08"],
},
{
    email: "NeonNim@gmail.com",
    id: 11, 
    name: 'NeonNim', 
    passwordHash: "bef6af5be84d5f62e54ed1547719c482", 
    profileBanner: "https://i.pinimg.com/564x/cb/f6/0e/cbf60e0243e8a0b08cea6c3fbd3dc330.jpg",
    profileBiography: "",  
    profileImage: 'https://i.pinimg.com/736x/be/f6/af/bef6af5be84d5f62e54ed1547719c482.jpg', 
    profileNftCollection: ["BA09","GB04","GB01","FB00","EB02"],
},
{
    email: "PixelPunk@gmail.com",
    id: 12, 
    name: 'PixelPunk', 
    passwordHash: "d8cb397b76fc53e6e461d6c244e25763", 
    profileBanner: "https://i.pinimg.com/564x/5f/7b/66/5f7b6620db16e5bc65979d019c6b7932.jpg",
    profileBiography: "._.", 
    profileImage: 'https://i.pinimg.com/564x/62/27/4d/62274d6148464c62cb6b25a5d0a67d1a.jpg', 
    profileNftCollection: ["CA03","CA00","AA06","AA05",],
}
]
