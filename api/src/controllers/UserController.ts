import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";


class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
         // Responsável por manipular o bando de dados.
        const usersRepository = getRepository(User); 

        // Faça uma busca por email na tabela.
        const userAlreadyExists = await usersRepository.findOne({ email })  
        if (userAlreadyExists) {
            return response.status(400).json({
                erro: "Usuario Já existe!!!"
            })
        }

        // Obrigadorio a criar para pode salva.
        const user = usersRepository.create({
            name,
            email
        })

        await usersRepository.save(user);

        return response.status(200).json(user)
    }
}

export { UserController }