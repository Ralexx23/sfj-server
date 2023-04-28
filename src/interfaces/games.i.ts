import { Document } from 'mongoose';
import { z } from 'zod';
import zodeer from '../utils/zoderr';

export const gamesZod = z.object({
    id: z.string(),
    type: z.string(),
    branch: z.string(),
    title: z.string(),
    description: z.string().optional(),
    questions: z.array(z.string()),
    created_at: z.date().default(new Date()),
    updated_at: z.date().optional(),
});

export type IGames = z.infer<typeof gamesZod>;
export type gamesDocument =  Document &
    IGames & {
    VerifySchema(Gdata?: IGames | gamesDocument): {
        success: boolean;
        errors?: ReturnType<typeof zodeer>;
        data?: IGames;
    };
    ToClient: () => IGames;
};
