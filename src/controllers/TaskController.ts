import { Handler, Request, Response } from "express";
import { Task } from "../models/Task";
import { z } from "zod";
import { HttpError } from "../erros/HttpError";

const StoreRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["todo", "doing", "done"]),
    priority: z.enum(["low", "medium", "high"]),
})

const UpdateRequestSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["todo", "doing", "done"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
})

export class TaskController {
    index: Handler = (req, res) => {
        const taks = Task.findAll();
        res.json(taks);
    };

    store = (req: Request, res: Response) => {
       const parsedBody = StoreRequestSchema.parse(req.body);
       const newTask = Task.create(parsedBody); 
       res.status(201).json(newTask);
    };

    show: Handler = (req, res) => {
        const { id } = req.params;
        const task = Task.findById(+id);
        if (!task) throw new HttpError(404, "Task not found");
        res.json(task);
    }

    update: Handler = (req, res) => {
        const { id } = req.params;
        const parsedBody = UpdateRequestSchema.parse(req.body);
        const task = Task.update(+id, parsedBody);
        if (!task) throw new HttpError(404, "Task not found");
        res.json(task);
    }

    delete: Handler = (req, res) => {
        const { id } = req.params;
        const task = Task.delete(+id);
        if (!task) throw new HttpError(404, "Task not found");
        res.json(task);
    }
}