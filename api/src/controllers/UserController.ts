import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup'
import { AppErros } from "../errors/AppErros";



class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        // if(!(await schema.isValid(request.body))){
        //     response.status(400).json({
        //         error: "Error Is Not Valido"
        //     })
        // }

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppErros(err)
        }

        // Responsável por manipular o bando de dados.
        const usersRepository = getCustomRepository(UsersRepository);

        // Faça uma busca por email na tabela.
        const userAlreadyExists = await usersRepository.findOne({ email })
        if (userAlreadyExists) {
            throw new AppErros("Usuário Já existe!!!")
        }

        // Obrigadorio a criar para pode salva.
        const user = usersRepository.create({
            name,
            email
        })

        await usersRepository.save(user);

        return response.status(201).json(user)
    }
}

export { UserController };
