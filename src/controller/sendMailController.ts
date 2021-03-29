import { Response, Request } from "express";
import { getCustomRepository, PersistedEntityNotFoundError } from "typeorm";
import {resolve} from 'path';
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { AppError } from "../../errors/AppError";


class sendMail{

    async execute(req: Request, res: Response ){
        const { email, surveys_id, value} = req.body 

        const userRepository = getCustomRepository(UsersRepository)
        const surveyRepository = getCustomRepository(SurveysRepository)
        const surveyUserRepository = getCustomRepository(SurveysUsersRepository)

        
 
        
        const validaUser = await userRepository.findOne({email});
        const validaSurvey = await surveyRepository.findOne({id: surveys_id});
        const npsMail = resolve(__dirname, '..','views','emails','sendMail.handlebars')
     
        
        const surveysUserExist = await surveyUserRepository.findOne({
            where: {user_id: validaUser.id, value: null},
            relations: ["user","survey"]
        });
        const variable = ({
            name: validaUser.name,
            title: validaSurvey.title,
            description:  validaSurvey.description,
            id: "",
            link: process.env.URL_MAIL
        })

        if(surveysUserExist){
            variable.id =surveysUserExist.id
            await SendMailService.execute(email,validaSurvey.title,variable, npsMail)
            return res.json(surveysUserExist)
        }


        if(!validaUser){
            throw new AppError('email não existe')
            // return res.status(400).json({
            //     error:""
            // })
        }


        if(!validaSurvey){
            throw new AppError('não existe id da consulta')
            // return res.status(400).json({
            //     error:""
            // })
        }
        //salvar infomações na tabela surveysUsers
       const surveyUser = surveyUserRepository.create({ 
           surveys_id,
            user_id: validaUser.id  
        })


       await surveyUserRepository.save(surveyUser);
        //enviar email para usuario
        variable.id = surveyUser.id
       await SendMailService.execute(email,validaSurvey.title,variable,npsMail)

       return res.status(201).json(surveyUser)
        
    }
}

export { sendMail };