import { Request } from 'express';

export interface custReq extends Request {
    user?: any;
}