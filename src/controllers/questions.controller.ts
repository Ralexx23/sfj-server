import { Request, Response } from 'express';
import QuestionModel from '../models/questions.models';

//Function of the route: Get
export const getQuestions = async (_req: Request, res: Response) => {
    const questions = await QuestionModel.find();
    res.status(200).send({ msg: 'questions', questions: questions.map((question) => question.ToClient()) });
};

//Function of the route: Post
export const postQuestion = async (req: Request, res: Response) => {
    const question = new QuestionModel(req.body.question);
    const check = question.VerifySchema();
    if (!check.success) {
        console.log('question data is not valid');
        console.log(check.errors);
        res.status(400).send({ msg: 'question data is not valid', err: check.errors });
        return;
    }

    // Check if the question already exists
    const questionExists = await QuestionModel.findOne({ question: question.question });
    if (questionExists) {
        console.log('question already exists');
        res.status(400).send({ msg: 'question already exists' });
        return;
    }

    await question.save();
    res.status(200).send({ msg: 'question created', question: question.ToClient() });
};

//Function of the route: Put
export const putQuestions = async (req: Request, res: Response) => {
    if (!req.body.question.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    // Check if the question not exists
    const questionExists = await QuestionModel.findById(req.body.question.id);
    if (!questionExists) {
        console.log("question doesn't exists");
        res.status(400).send({ msg: "question doesn't exists" });
        return;
    }

    const updata = req.body.question;
    const check = questionExists.VerifySchema(updata);
    if (!check.success) {
        console.log('Data is not well formated');
        res.status(400).send({ msg: 'Data is not well formated', err: check.errors });
    }
    questionExists.question = updata.question;
    questionExists.answer = updata.answer;
    questionExists.options = updata.options;
    questionExists.value = updata.value;
    questionExists.save();
    res.status(200).send({ msg: 'question updated', question: questionExists.ToClient() });
};

//Function of the route: Delete
export const deleteQuestions = async (req: Request, res: Response) => {
    if (!req.body.question.id) {
        console.log('no id provided');
        res.status(400).send({ msg: 'no id provided' });
        return;
    }

    // Check if the question not exists
    const questionsExists = await QuestionModel.findById(req.body.question.id);
    if (!questionsExists) {
        console.log("question doesn't exists");
        res.status(400).send({ msg: "question doesn't exists" });
        return;
    }

    await QuestionModel.deleteOne({ _id: req.body.question.id });
    res.status(200).send({ msg: 'question deleted' });
    return;
};