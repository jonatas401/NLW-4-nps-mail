import {Request, Response} from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController{

    async execute(req: Request, res: Response){
        const { surveys_id } = req.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.find({
            surveys_id,
            value: Not(IsNull())
        });
        
        const detratores = surveyUser.filter(survey => (survey.value != null && survey.value >= 0 && survey.value <= 6)).length;
        const promotores = surveyUser.filter(survey => (survey.value != null && survey.value >= 9 && survey.value <= 10)).length;
        const passivos = surveyUser.filter(survey => (survey.value != null && survey.value >=7 && survey.value <= 8)).length;
    
        const total = surveyUser.length;

        const Nps = Number(((promotores - detratores) / total * 100).toFixed(2))

        return res.json({
            detratores,
            promotores,
            passivos,
            total,
            Nps
        })
    }

}

export {NpsController}