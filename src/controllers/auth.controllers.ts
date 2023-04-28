import { Response } from 'express';
import { custReq } from '../utils/requestExtend';
import jwt from 'jsonwebtoken';

export const Login = (req: custReq, res: Response) => {
    //Received the req.body
    //Validation the information with Zod
    //Store in database


    //Generate token
    const token = jwt.sign({
        test: "test"
    }, "secret", {
        expiresIn: 60 * 60 * 24
    });

    return res.json({
        token
    });
};

export const GetAuth = (req: custReq, res: Response) => {
    return res.json({
        user: req.user,
        msg: "Auth Data"
    });
};
