import { MigrationInterface, QueryRunner } from "typeorm";
import { Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class CreateSchema1712010343083 implements MigrationInterface {
    name = "CreateSchema1712010343083";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        isNullable: false,
                        generationStrategy: "uuid",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "passwordHash",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
