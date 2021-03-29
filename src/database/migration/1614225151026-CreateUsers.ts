import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614225151026 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns:[
                {
                    name:"id",
                    type:"varchar(255)",
                    isPrimary:true,
                },
                {
                    name:"name",
                    type:"varchar",
                    
                },
                {
                    name:"email",
                    type:"varchar",

                },
                {
                    name:"create_at",
                    type:"timestamp",
                    default: "now()",

                }
            ]
            }),true);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
