import { Document } from "mongoose";
import { z } from "zod";
import zoderr from "../utils/zoderr";
import { ObjectId } from "mongodb";

export const scoresZod = z.object({
  user: z.union([z.string(), z.instanceof(ObjectId)]),
  games: z.union([z.string(), z.instanceof(ObjectId)]),
  score: z.object({
    total: z.number().optional(),
    correct: z.number().optional(),
    incorrect: z.number().optional(),
    points: z.number().optional(),
  }),
  created_at: z.date().default(new Date()),
});

export type IScores = z.infer<typeof scoresZod>;
export type scoresDocument = Document &
  IScores & {
    ToClient: () => IScores;
    VerifySchema(Sdata?: IScores | scoresDocument): {
      success: boolean;
      errors?: ReturnType<typeof zoderr>;
      data?: IScores;
    };
  };
