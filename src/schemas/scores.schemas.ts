import { scoresZod, scoresDocument, IScores } from "../interfaces/scores.i";
import zoderr from "../utils/zoderr";
import mongoose from "mongoose";

let ScoresSchema = new mongoose.Schema<scoresDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  games: { type: mongoose.Schema.Types.ObjectId, ref: "games" },
  score: {
    total: { type: Number, required: true },
    correct: { type: Number, required: true },
    incorrect: { type: Number, required: true },
    points: { type: Number, required: true },
  },
  created_at: { type: Date, required: true, default: Date.now },
});

ScoresSchema.methods.ToClient = function (): IScores {
  const curr = this as scoresDocument;
  const scores = {
    id: curr._id.toString(),
    user: curr.user,
    games: curr.games,
    score: curr.score,
    created_at: curr.created_at,
  } as IScores;
  return scores;
};

ScoresSchema.methods.VerifySchema = function (
  Sdata?: IScores | scoresDocument
): {
  success: boolean;
  errors?: ReturnType<typeof zoderr>;
  data?: IScores;
} {
  if (!Sdata) {
    Sdata = this as scoresDocument;
  }

  let result = scoresZod.safeParse(Sdata);
  if (!result.success) {
    return { success: false, errors: zoderr(result.error) };
  } else {
    return { success: true, data: result.data };
  }
};

export default ScoresSchema;
