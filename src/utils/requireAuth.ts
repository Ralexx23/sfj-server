import { Response, NextFunction } from "express";
import { custReq } from "./requestExtend";
import jwt from 'jsonwebtoken';

export const requireAuth = (req: custReq, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) 
        return res.status(401).send({ msg: "Unauthorized"});

    const token = authHeader.split(' ')[1];

    if (!token)
        return res.status(401).send({ msg: "Unauthorized"});

    jwt.verify(token, 'secret', (err, payload) => {
        if (err)
            return res.status(401).send({ msg: "Unauthorized"});
        
        req.user = payload;
        next();
    });
};