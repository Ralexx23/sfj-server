import { scoreZod, scoreDocument, IScore } from '../interfaces/score.i';
import zoderr from '../utils/zoderr';
import mongoose, { mongo } from 'mongoose';

let ScoreSchema = new mongoose.Schema<scoreDocument>({
    user: { type: String, required: true },
    games: { type: String, required: true},
    score: { type: Number, required: false},
    created_at: { type: Date, required: true, default: Date.now }
});

ScoreSchema.methods.ToClient = function (): IScore {
    const curr = this as scoreDocument;
    const score = {
        id: curr._id.toString(),
        user: curr.user,
        games: curr.games,
        score: curr.score
    } as IScore;
    return score;
}

ScoreSchema.methods.VerifySchema = function (Sdata?: IScore | scoreDocument): {
    success: boolean;
    errors?: ReturnType<typeof zoderr>;
    data?: IScore;
}{
    if(!Sdata){
        Sdata = this as scoreDocument;
    }

    let result = scoreZod.safeParse(Sdata);
    if(!result.success) {
        return { success: false, errors: zoderr(result.error) };
    } else {
        return { success: true, data: result.data };
    }
}

export default ScoreSchema;