import { Document } from "mongoose";
import { z } from "zod";
import zoderr from "../utils/zoderr";
import { questionZod } from "./objects/questions.i";

export const gamesZod = z.object({
  id: z.string(),
  type: z.string(),
  branch: z.string(),
  title: z.string(),
  description: z.string().optional(),
  questions: questionZod.array(),
  created_at: z.date().default(new Date()),
  updated_at: z.date().optional(),
});

export type IGames = z.infer<typeof gamesZod>;
export type gamesDocument = Document &
  IGames & {
    ToClient: () => IGames;
    VerifySchema(Gdata?: IGames | gamesDocument): {
      success: boolean;
      errors?: ReturnType<typeof zoderr>;
      data?: IGames;
    };
  };

/* const VerifySchema = function (Gdata?: IGames | gamesDocument): {
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
}; */
