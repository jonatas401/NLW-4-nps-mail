import { Entity, EntityRepository, Repository } from "typeorm";
import { Surveys_User } from "../models/Surveys_Users";


@EntityRepository(Surveys_User)
class SurveysUsersRepository extends Repository<Surveys_User>{

    
}
export { SurveysUsersRepository }