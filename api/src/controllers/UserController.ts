import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRespository";


class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
         // Responsável por manipular o bando de dados.
        const usersRepository = getCustomRepository(UsersRepository); 

        // Faça uma busca por email na tabela.
        const userAlreadyExists = await usersRepository.findOne({ email })  
        if (userAlreadyExists) {
            return response.status(400).json({
                erro: "Usuário Já existe!!!"
            })
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
