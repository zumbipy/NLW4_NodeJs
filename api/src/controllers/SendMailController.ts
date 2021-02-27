import { resolve } from 'path';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const user = await usersRepository.findOne({ email, })

        if (!user) {
            return response.status(400).json({
                error: "Usuário não existe"
            });
        }

        const survey = await surveysRepository.findOne({ id: survey_id })
        if(!survey) {
            return response.status(400).json({
                error: "Survey não existe!!"
            })
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description
        }

        await SendMailService.execute(email, survey.title, variables, npsPath)

        return response.status(200).json(surveyUser)
         
    }
}

export { SendMailController }
