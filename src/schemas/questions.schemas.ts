import { questionZod, questionDocument, IQuestion } from "../interfaces/questions.i";
import zoderr from "../utils/zoderr";
import mongoose from "mongoose";

let QuestionSchema = new mongoose.Schema<questionDocument>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    options: { type: [String], required: true },
    value: { type: Number, required: true },    
});

QuestionSchema.methods.ToClient = function (): IQuestion {
    const curr = this as questionDocument;
    const question = {
        id: curr._id.toString(),
        question: curr.question,
        answer: curr.answer,
        options: curr.options,
        value: curr.value,
    } as IQuestion;
    return question;
}

QuestionSchema.methods.VerifySchema = function (Qdata?: IQuestion | questionDocument): {
    success: boolean;
    errors?: ReturnType<typeof zoderr>;
    data?: IQuestion;
} {
    if (!Qdata) {
        Qdata = this as questionDocument;
    } 

    let result = questionZod.safeParse(Qdata);
    if (!result.success) {
        return { success: false, errors: zoderr(result.error) };
    } else {
        return { success: true, data: result.data };
    }
}

export default QuestionSchema;