import { Request, Response } from "express";
import ScoresModel from "../models/scores.models";
import UsersModel from "../models/user.models";
import GamesModel from "../models/games.models";

//Function of the route: Get
export const getScores = async (_req: Request, res: Response) => {
  const scores = await ScoresModel.find();
  console.log(scores);
  res
    .status(200)
    .send({ msg: "scores", scores: scores.map((scores) => scores.ToClient()) });
};

//Function of the route: Post
export const postScores = async (req: Request, res: Response) => {
  //Check if users and games exists
  const [user, game] = await Promise.all([
    UsersModel.findById(req.body.scores.user),
    GamesModel.findById(req.body.scores.games),
  ]);

  if (!user || !game) {
    console.log("user or game doesn't exists");
    res.status(400).send({ msg: "user or game doesn't exists" });
    return;
  }
  const scores = new ScoresModel(req.body.scores);
  const check = scores.VerifySchema();
  if (!check.success) {
    console.log("scores data is not valid");
    console.log(check.errors);
    res
      .status(400)
      .send({ msg: "scores data is not valid", err: check.errors });
    return;
  }

  await scores.save();
  res.status(200).send({ msg: "scores created", scores: scores.ToClient() });
};

//Function of the route: Put
export const putScores = async (req: Request, res: Response) => {
  if (!req.body.scores.id) {
    console.log("no id provided");
    res.status(400).send({ msg: "no id provided" });
    return;
  }

  //Check if the score not exists
  const scoreExists = await ScoresModel.findById(req.body.scores.id);
  if (!scoreExists) {
    console.log("scores doesn't exists");
    res.status(400).send({ msg: "scores doesn't exists" });
    return;
  }

  const updata = req.body.scores;
  const check = scoreExists.VerifySchema(updata);
  if (!check.success) {
    console.log("Data is not well formated");
    res
      .status(400)
      .send({ msg: "Data is not well formated", err: check.errors });
    return;
  }
  scoreExists.user = updata.user;
  scoreExists.games = updata.games;
  scoreExists.score = updata.score;
  scoreExists.save();
  res
    .status(200)
    .send({ mmsg: "scores updated", scores: scoreExists.ToClient() });
};

//Function of the route: Delete
export const deleteScores = async (req: Request, res: Response) => {
  if (!req.body.scores.id) {
    console.log("no id provided");
    res.status(400).send({ msg: "no id provided" });
    return;
  }

  // Check if the question not exists
  const scoreExists = await ScoresModel.findById(req.body.scores.id);
  if (!scoreExists) {
    console.log("score doesn't exists");
    res.status(400).send({ msg: "game doesn't exists" });
    return;
  }

  await ScoresModel.deleteOne({ _id: req.body.scores.id });
  res.status(200).send({ msg: "score deleted" });
  return;
};
