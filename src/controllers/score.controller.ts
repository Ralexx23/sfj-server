import { Request, Response } from 'express';
import ScoreModel from '../models/score.models';

//Function of the route: Get
export const getScore = async (_req: Request, res: Response) => {
    const score = await ScoreModel.find();
    res.status(200).send({ msg: 'score', score: score.map((score) => score.ToClient()) });
};

//Function of the route: Post
export const postScore = async (req: Request, res: Response) => {
    const score = new ScoreModel(req.body.scores);
    console.log(req.body.scores);
    const check = score.VerifySchema();
    if (!check.success) {
        console.log('score data is not valid');
        console.log(check.errors);
        res.status(400).send({ msg: 'score data is not valid', err: check.errors });
        return;
    }

    await score.save();
    res.status(200).send({ msg: 'score created', score: score.ToClient() });
};

//Function of the route: Put
export const putScore = async (req: Request, res: Response) => {
    if (!req.body.scores.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    //Check if the games not exists
    const scoreExists = await ScoreModel.findById(req.body.scores.id);
    console.log(req.body.scores.id);
    if (!scoreExists) {
        console.log("score doesn't exists");
        res.status(400).send({ msg: "score doesn't exists" });
        return;
    }

    const updata = req.body.scores;
    const check = scoreExists.VerifySchema(updata);
    if (!check.success) {
        console.log('Data is not well formated');
        res.status(400).send({ msg: 'Data is not well formated', err: check.errors });
    }
    scoreExists.user = updata.user;
    scoreExists.games = updata.games;
    scoreExists.score = updata.score;
    scoreExists.created_at = updata.created_at;
    scoreExists.save();
    res.status(200).send({ msg: 'score updated', score: scoreExists.ToClient() });
};

//Function of the route: Delete
export const deleteScore = async (req: Request, res: Response) => {
    if (!req.body.scores.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    // Check if the question not exists
    const scoreExists = await ScoreModel.findById(req.body.scores.id);
    if (!scoreExists) {
        console.log("score doesn't exists");
        res.status(400).send({ msg: "score doesn't exists" });
        return;
    }

    await scoreExists.deleteOne({ _id: req.body.scores.id });
    res.status(200).send({ msg: 'score deleted' });
    return;
};