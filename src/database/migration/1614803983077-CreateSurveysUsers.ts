import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

export class CreateSurveysUsers1614803983077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"Surveys_Users",
                columns:[
                    {
                        name: "id",
                        type:"varchar(255)",
                        isPrimary: true
                    },
                    {
                        name:"user_id",
                        type:"varchar(255)"
                        
                    },
                    {
                        name: "surveys_id",
                        type: "varchar(255)"
                    },
                    {
                        name: "value",
                        type:"int",
                        isNullable:true
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    },
                
                 ],
                 foreignKeys:[
                     {
                        name:"fkUsers",
                        referencedTableName: "users",
                        referencedColumnNames:["id"],
                        columnNames:["user_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                     },
                     {
                         name: "fkSurveys",
                         referencedTableName:"surveys",
                         referencedColumnNames:["id"],
                         columnNames:["surveys_id"],
                         onDelete: "CASCADE",
                         onUpdate: "CASCADE"
                     }

                 ]
            })
        )

        }
    
        

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Surveys_Users");
    }

}
