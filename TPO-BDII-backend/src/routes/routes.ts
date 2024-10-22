import express, { Request, Response } from 'express';
import { Task } from '../model/Task';
import { body, validationResult } from 'express-validator';
import { carritoDao } from "../dao/index";

const router = express.Router();

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
];

let tasks: Task[] = [];

router.get('/carrito', async (req: Request, res: Response) => {
    try {
        const carrito = await carritoDao.getProducts(req.params.id);
        res.json(carrito);
      } catch (error) {
        res.json(error);
      }
});

router.post('/', taskValidationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };

    tasks.push(task);
    res.status(201).json(task);
});


router.get('/:id', taskValidationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        res.json(task);
    }
});

router.put('/:id', (req: Request, res: Response) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;

        res.json(task);
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if (index === -1) {
        res.status(404).send('Task not found');
    } else {
        tasks.splice(index, 1);
        res.status(204).send();
    }
});


export default router;