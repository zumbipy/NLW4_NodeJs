import { Request, Response, } from "express";
import { getCustomRepository,  Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class NpsController {
    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;
        const surseysUserRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surseysUserRepository.find({
            survey_id,
            value: Not(IsNull())
        })

        const detractor = surveysUsers.filter(survey =>
            survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveysUsers.filter(survey =>
            survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveysUsers.filter(survey =>
            survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveysUsers.length;

        const calculo =( (promoters - detractor) / totalAnswers ) * 100

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: Number(calculo.toFixed(2)),
        })
    }
}

export { NpsController }