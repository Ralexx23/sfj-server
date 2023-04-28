import { model } from "mongoose";
import ScoreSchema from "../schemas/score.schemas";
import { scoreDocument } from "../interfaces/score.i";

const ScoreModel = model<scoreDocument>('score', ScoreSchema);

export default ScoreModel;