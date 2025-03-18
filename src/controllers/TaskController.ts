import { Handler, Request, Response } from "express";
import { Task } from "../models/Task";

export class TaskController {
    index: Handler = (req, res) => {
        const taks = Task.findAll();
        res.json(taks);
    };

    store = (req: Request, res: Response) => {
        
    };
}