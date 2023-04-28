import { model } from "mongoose";
import UserSchema from "../schemas/user.schemas";
import { userDocument } from "../interfaces/user.i";

const UserModel = model<userDocument>('users', UserSchema);

export default UserModel;