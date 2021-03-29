
import {Request, Response} from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import { AppError } from '../../errors/AppError'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

class AnswerController{
    async execute(req:Request, res: Response){

        const {value} = req.params
        const { u } = req.query

        const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

        const SurveyUser = await surveyUserRepository.findOne({
            id: String(u),
        })

        if(!SurveyUser){
            throw new AppError('não encontrado')
        }

        SurveyUser.value = Number(value);

        await surveyUserRepository.save(SurveyUser);

        return res.status(200).json(SurveyUser);




    }
}

export {AnswerController}