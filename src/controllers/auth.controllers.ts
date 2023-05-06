import { Response } from "express";
import { custReq } from "../utils/requestExtend";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models";
import Encrypt from "../utils/encrypt";

export const Login = async (req: custReq, res: Response) => {
  //Received the req.body
  //Validation the information with Zod
  //Store in database
  const authData = req.body.auth;
  if (!authData) {
    console.log("no auth data");
    console.log(authData);
    res.status(400).send({ msg: "no auth data" });
    return;
  } else if (!authData.user || !authData.password) {
    res.status(404).send({ msg: "user or password not provided" });
    return;
  }

  const user = await UserModel.findOne({ user: authData.user });
  if (!user) {
    res.status(400).send({ msg: "user not found" });
    return;
  }

  const check = await Encrypt.compare(authData.password, user.password);
  if (!check) {
    console.log("password not match");
    res.status(400).send({ msg: "password not match" });
    return;
  }

  //Generate token
  const token = jwt.sign(
    {
      user: authData,
    },
    "secret",
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  return res.json({
    token,
  });
};

export const GetAuth = async (req: custReq, res: Response) => {
  const user = await UserModel.findOne({ user: req.user.user.user });
  return res.json({
    user: user?.ToClient(),
    msg: "Auth Data",
  });
};
