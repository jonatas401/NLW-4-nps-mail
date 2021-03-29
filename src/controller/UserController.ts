import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../../errors/AppError';


class UserController{

    async create(req: Request,res: Response){
        


        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required('nome é obrigatorio'),
            email: yup.string().email().required('email invalido')
        })

        // if(await !schema.isValid(req.body) || name == "" || email == ""){
        //     return res.status(400).json('algo deu errado, tente novamente')
        // }

        try{
            await schema.validate(req.body, { abortEarly: false})
        }catch(err){
            throw new AppError(err)
            //return res.status(400).json({error: err})
        }

        const userR = getCustomRepository(UsersRepository);

        const userAlredyExists =  await userR.findOne({
            email
        });

        if(userAlredyExists){
            throw new AppError('email já existe')
            
        }
        
        const user = userR.create({name,email});


        await userR.save(user);

        

        return res.status(201).json(user)
  
    }
}

export { UserController };
