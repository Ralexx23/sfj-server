import { model } from "mongoose";
import ScoresSchema from "../schemas/scores.schemas";
import { scoresDocument } from "../interfaces/scores.i";

const ScoresModel = model<scoresDocument>("scores", ScoresSchema);

export default ScoresModel;
