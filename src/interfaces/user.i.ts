import { Document } from 'mongoose';
import { z } from 'zod';
import zodeer from '../utils/zoderr';

export const userZod = z.object({
    id: z.string(),
    type: z.enum(['user', 'admin']).default('user'),
    user: z.string().min(3).max(20),
    name: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
    password: z.string().min(8),
});

export type IUser = z.infer<typeof userZod>;
export type userDocument =  Document & 
    IUser & { 
      VerifySchema(Udata?: IUser | userDocument): {
          success: boolean;
          errors?: ReturnType<typeof zodeer>;
          data?: IUser;
      };
      ToClient: () => IUser;
};