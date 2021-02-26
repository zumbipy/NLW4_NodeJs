import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";


class UserController {
    async create(request: Request, response: Response){
        const {name, email} = request.body;
        
        const usersRepository = getRepository(User);  // Responsável por manipular o bando de dados.
        
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