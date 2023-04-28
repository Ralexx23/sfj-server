import { Document } from 'mongoose';
import { z } from 'zod';
import zodeer from '../utils/zoderr';

export const questionZod = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    options: z.array(z.string()),
    value: z.number(),
});

export type IQuestion = z.infer<typeof questionZod>;
export type questionDocument =  Document &
    IQuestion & {
    VerifySchema(Qdata?: IQuestion | questionDocument): {
        success: boolean;
        errors?: ReturnType<typeof zodeer>;
        data?: IQuestion;
    };
    ToClient: () => IQuestion;
};
