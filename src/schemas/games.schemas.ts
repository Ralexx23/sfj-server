import { gamesZod, gamesDocument, IGames } from "../interfaces/games.i";
import zoderr from "../utils/zoderr";
import mongoose from "mongoose";

let GamesSchema = new mongoose.Schema<gamesDocument>({
  type: { type: String, required: true },
  branch: { type: String, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  questions: [
    {
      question: { type: String, required: false },
      image: { type: String, required: false },
      answer: { type: String, required: false } || {
        type: Boolean,
        required: false,
      },
      options: { type: [String], required: false },
      value: { type: Number, required: false },
    },
  ],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: false },
});

GamesSchema.methods.ToClient = function (): IGames {
  const curr = this as gamesDocument;
  const games = {
    id: curr._id.toString(),
    type: curr.type,
    branch: curr.branch,
    title: curr.title,
    description: curr.description,
    questions: curr.questions,
    updated_at: curr.updated_at,
  } as IGames;
  return games;
};

GamesSchema.methods.VerifySchema = function (Gdata?: IGames | gamesDocument): {
  success: boolean;
  errors?: ReturnType<typeof zoderr>;
  data?: IGames;
} {
  if (!Gdata) {
    Gdata = this as gamesDocument;
  }

  let result = gamesZod.safeParse(Gdata);
  if (!result.success) {
    return { success: false, errors: zoderr(result.error) };
  } else {
    return { success: true, data: result.data };
  }
};

export default GamesSchema;
