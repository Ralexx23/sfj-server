import { model } from "mongoose";
import QuestionSchema from "../schemas/questions.schemas";
import { questionDocument } from "../interfaces/questions.i";

const QuestionModel = model<questionDocument>('questions', QuestionSchema);

export default QuestionModel;