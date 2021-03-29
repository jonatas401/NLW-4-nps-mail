import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import {Survey} from './survey'


@Entity("Surveys_Users")
class Surveys_User{

    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column()
    user_id:string; 

    @Column()
    surveys_id: string;

    @ManyToOne(()=>Survey)
    @JoinColumn({name: 'surveys_id'})
    survey: Survey

    @Column()
    value: number;

    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(! this.id){
            this.id = uuid()
        }
    }

}

export { Surveys_User };