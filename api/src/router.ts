import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { SurveysRepository } from './repositories/SurveysRepository';

const router = Router();
const userController = new UserController();
const surveyController = new SurveysController();

router.post("/users", userController.create);
router.post("/surveys", surveyController.create);

export { router }