import { Request, Response } from 'express';
import GamesModel from '../models/games.models';

//Function of the route: Get
export const getGames = async (_req: Request, res: Response) => {
    const games = await GamesModel.find();
    console.log(games);
    res.status(200).send({ msg: 'games', games: games.map((games) => games.ToClient()) });
};

//Function of the route: Post
export const postGames = async (req: Request, res: Response) => {
    const games = new GamesModel(req.body.games);
    const check = games.VerifySchema();
    if (!check .success) {
        console.log('games data is not valid');
        console.log(check.errors);
        res.status(400).send({ msg: 'games data is not valid', err: check.errors });
        return;
    }

    //Check if the games already exists
    const gameExists = await GamesModel.findOne({ title: games.title  });
    if (gameExists) {
        console.log('games already exists');
        res.status(400).send({ msg: 'games already exists'});
        return;
    }

    await games.save();
    res.status(200).send({ msg: 'games created', games: games.ToClient() });
};

//Function of the route: Put
export const putGames = async (req: Request, res: Response) => {
    if (!req.body.games.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    //Check if the games not exists
    const gameExists = await GamesModel.findById(req.body.games.id);
    if (!gameExists) {
        console.log("games doesn't exists");
        res.status(400).send({ msg: "games doesn't exists" });
        return;
    }

    const updata = req.body.games;
    const check = gameExists.VerifySchema(updata);
    if (!check.success) {
        console.log('Data is not well formated');
        res.status(400).send({ msg: 'Data is not well formated', err: check.errors });
        return;
    }
    gameExists.type = updata.type;
    gameExists.branch = updata.branch;
    gameExists.title = updata.title;
    gameExists.description = updata.description;
    gameExists.questions = updata.questions;
    gameExists.updated_at = updata.updated_at;
    gameExists.save();
    res.status(200).send({ mmsg: 'games updated', games: gameExists.ToClient() });
};

//Function of the route: Delete
export const deleteGames = async (req: Request, res: Response) => {
    if (!req.body.games.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    // Check if the question not exists
    const gameExists = await GamesModel.findById(req.body.games.id);
    if (!gameExists) {
        console.log("game doesn't exists");
        res.status(400).send({ msg: "game doesn't exists" });
        return;
    }

    await GamesModel.deleteOne({ _id: req.body.games.id });
    res.status(200).send({ msg: 'game deleted' });
    return;
};