import { Document } from "mongoose";
import { z } from "zod";
import zodeer from "../utils/zoderr";

export const scoreZod = z.object({
    id: z.string(),
    user: z.string(),
    games: z.string(),
    score: z.number(),
    created_at: z.date().default(new Date()),
});

export type IScore = z.infer<typeof scoreZod>;
export type scoreDocument = Document & 
    IScore & {
    VerifySchema(Sdata?: IScore | scoreDocument): {
        success: boolean;
        errors?: ReturnType<typeof zodeer>;
        data?: IScore;
    };
    ToClient: () => IScore;
};