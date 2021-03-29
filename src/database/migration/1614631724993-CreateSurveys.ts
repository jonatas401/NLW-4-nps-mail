
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614631724993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"surveys",
            columns:[
                {
                name:"id",
                type:"varchar(255)",
                isPrimary: true
                },
                {
                    name:"title",
                    type: "varchar"

                },
                {
                    name:"description",
                    type: "varchar"
                },
                {
                    name:"create_at",
                    type:"timestamp",
                    default: "now()"
                }
        ]
        
        
        })
            )}
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys')
    }

}
