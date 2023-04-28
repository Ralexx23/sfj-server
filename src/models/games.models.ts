import { model } from "mongoose";
import GamesSchema from "../schemas/games.schemas";
import { gamesDocument } from "../interfaces/games.i";

const GamesModel = model<gamesDocument>('games', GamesSchema);

export default GamesModel;