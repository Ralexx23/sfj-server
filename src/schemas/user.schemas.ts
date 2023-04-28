import { userZod, userDocument, IUser } from "../interfaces/user.i";
import zoderr from "../utils/zoderr";
import mongoose from "mongoose";

let UserSchema = new mongoose.Schema<userDocument>({
    type: { type: String, enum: ['user', 'admin'], required: true },
    user: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.methods.ToClient = function (): IUser {
    const curr = this as userDocument;
    const user = {
        id: curr._id.toString(),
        type: curr.type,
        user: curr.user,
        name: curr.name,
        lastname: curr.lastname,
    } as IUser;
    return user;
};

UserSchema.methods.VerifySchema = function (Udata?: IUser | userDocument): {
    success: boolean;
    errors?: ReturnType<typeof zoderr>;
    data?: IUser;
} {
    if (!Udata) {
        Udata = this as userDocument;
    } 

    let result = userZod.safeParse(Udata);
    if (!result.success) {
        return { success: false, errors: zoderr(result.error) };
    } else {
        return { success: true, data: result.data };
    }
};

export default UserSchema;