import { User, UserModel } from "../model/user.model";

export async function createUserStaff(dto) {
    try {
        const user = await UserModel.create(dto)
        return user
    } catch (error) {
        console.log(error);    
    }
}


export async function getUserNumbersStaff() {
    const userCount = await UserModel.find().count()
    const oddDays = await UserModel.find({days: "Toq kunlari (Dush.Chor.Juma)"}).count()
    const evenDays = userCount - oddDays
    return [userCount, oddDays, evenDays]
}

