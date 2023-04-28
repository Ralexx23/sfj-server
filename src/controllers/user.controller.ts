import { Request, Response } from "express";
import UserModel from "../models/user.models";

//Function of the route: Get
export const getUsers = async (_req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).send({ msg: 'users', users: users.map((user) => user.ToClient()) });
};

//Function of the route: Post
export const postUser = async (req: Request, res: Response) => {
    const user = new UserModel(req.body.user);
    const check = user.VerifySchema();
    if (!check.success) {
        console.log('user data is not valid');
        console.log(check.errors);
        res.status(400).send({ msg: 'user data is not valid', err: check.errors });
        return;
    }

    // Check if the user already exists
    const userExists = await UserModel.findOne({ user: user.user });
    if (userExists) {
        console.log('user already exists');
        res.status(400).send({ msg: 'user already exists' });
        return;
    }

    await user.save();
    res.status(200).send({ msg: 'user created', user: user.ToClient() });
};

//Function of the route: Put
export const putUsers = async (req: Request, res: Response) => {
    if (!req.body.user.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    // Check if the user already exists
    const userExists = await UserModel.findById(req.body.user.id);
    if (!userExists) {
        console.log("user doesn't exists");
        res.status(400).send({ msg: "user doesn't exists" });
        return;
    }

    const updata = req.body.user;
    updata.pasaword = userExists.password;
    const check = userExists.VerifySchema(updata);
    if (!check.success) {
        console.log('Data is not well formated');
        res.status(400).send({ msg: 'Data is not well formated', err: check.errors });
    }
    userExists.type = updata.type;
    userExists.user = updata.user;
    userExists.name = updata.name;
    userExists.lastname = updata.lastname;
    userExists.save();
    res.status(200).send({ msg: 'user updated', user: userExists.ToClient() });
};

//Function of the route: Delete
export const deleteUser = async (req: Request, res: Response) => {

    if (!req.body.user.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    // Check if the user already exists
    const userExists = await UserModel.findById(req.body.user.id);
    if (!userExists) {
        console.log("user doesn't exists");
        res.status(400).send({ msg: "user doesn't exists" });
        return;
    }

    await UserModel.deleteOne({ _id: req.body.user.id });
    res.status(200).send({ msg: 'user deleted' });
    return;
};