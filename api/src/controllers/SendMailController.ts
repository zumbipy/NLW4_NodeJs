import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({ email, })

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "Usuário não existe"
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id })
        if(!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey não existe!!"
            })
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);

        return response.status(200).json(surveyUser)
         
    }
}

export { SendMailController }