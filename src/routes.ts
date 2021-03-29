import {Router} from 'express';
import { SurveysController } from './controller/SurveysController';
import { UserController } from './controller/UserController';
import { sendMail } from './controller/sendMailController'
import { AnswerController } from './controller/AnswerController';
import { NpsController } from './controller/NpsController';

const router = Router();
const userController = new UserController();
const surveysController = new SurveysController()
const sendMailC = new sendMail()
const answer = new AnswerController()
const NPSController = new NpsController()

router.post('/users',  userController.create);
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);
router.post('/surveyUser', sendMailC.execute)
// router.get(`/answers/:value`,(req,res)=>{
//     res.send(`obrigador pela sua resposta`)
// })
router.get(`/answers/:value`, answer.execute,(req,res)=>{
    res.redirect('/Nps')
})
router.get('/Nps/:surveys_id' , NPSController.execute)



export { router };