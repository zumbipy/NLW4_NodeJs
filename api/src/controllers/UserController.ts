import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";


class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getRepository(User);  // Responsável por manipular o bando de dados.
        const userAlreadyExists = await usersRepository.findOne({ email })  // Faça uma busca por email na tabela.

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