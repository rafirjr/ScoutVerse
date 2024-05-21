import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm";

// enum Khoump {
//     KYLIG = "kylig",
//     ARDZVIG = "ardzvig",
//     ARI = "ari",
//     ARENOUSH = "arenoush",
//     YERETS = "yerets",
//     BARMANOUHI = "barmanouhi",
//     KERAKOUYN = "kerakouyn",
// }

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
                        type: "uuid",
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
            }),
            true // Execute synchronously
        );

        await queryRunner.createTable(
            new Table({
                name: "scout",
                columns: [
                    {
                        name: "id",
                        isNullable: false,
                        generationStrategy: "uuid",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "first_name",
                        isNullable: false,
                        type: "varchar",
                    },
                    {
                        name: "last_name",
                        isNullable: false,
                        type: "varchar",
                    },
                    {
                        name: "khoump",
                        type: "varchar",
                        enum: [
                            "kylig",
                            "ardzvig",
                            "ari",
                            "arenoush",
                            "yerets",
                            "barmanouhi",
                            "kerakouyn",
                        ],
                    },
                    {
                        name: "date_of_birth",
                        type: "date", // In PostgreSQL the format is 'YYYY-MM-DD'
                        isNullable: false,
                    },
                    {
                        name: "street",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "zip_code",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "contact_number",
                        type: "varchar",
                        length: "11",
                        isNullable: true,
                    },
                    {
                        name: "contact_email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "parent_name",
                        type: "varchar",
                    },
                    {
                        name: "parent_email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "parent_number",
                        type: "varchar",
                    },
                    {
                        name: "allergies",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "size",
                        type: "enum",
                        enum: [
                            "YS",
                            "YM",
                            "YL",
                            "YXL",
                            "AS",
                            "AM",
                            "AL",
                            "AXL",
                            "AXXL",
                            "AXXXL",
                        ],
                    },
                    {
                        name: "status",
                        isNullable: false,
                        type: "enum",
                        enum: ["ACTIVE", "INACTIVE"],
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
                ],
            }),
            true //execute synchronously
        );

        await queryRunner.createTable(
            new Table({
                name: "scout_accolades",
                columns: [
                    {
                        name: "accolade_id",
                        isNullable: false,
                        generationStrategy: "uuid",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "scout_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "gark_accolade",
                        type: "enum",
                        enum: [
                            "norakir",
                            "norendza",
                            "pen gark",
                            "ayp gark",
                            "vgayal",
                            "araratian",
                        ],
                    },
                    {
                        name: "gark_date",
                        type: "date", // In PostgreSQL the format is 'YYYY-MM-DD'
                    },
                    {
                        name: "astijan_accolade",
                        type: "enum",
                        enum: [
                            "pokh_arachnort",
                            "arachnort",
                            "vareech_arachnort",
                            "pokh_khmpabed",
                            "khmpabed",
                        ],
                    },
                    {
                        name: "astijan_date",
                        type: "date", // In PostgreSQL the format is 'YYYY-MM-DD'
                    },
                    {
                        name: "bashdon_accolade",
                        type: "enum",
                        enum: [
                            "pokh_arachnort",
                            "arachnort",
                            "vareech_arachnort",
                            "pokh_khmpabed",
                            "khmpabed",
                            "miavori_khmpabed",
                            "masnajooghi_pokh_khmpabed",
                            "masnajooghi_khmpabed",
                        ],
                    },
                    {
                        name: "bashdon_date",
                        type: "date", // In PostgreSQL the format is 'YYYY-MM-DD'
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["scout_id"],
                        referencedTableName: "scout",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true //execute synchronously
        );

        await queryRunner.createTable(
            new Table({
                name: "attendance",
                columns: [
                    {
                        name: "attendance_id",
                        isNullable: false,
                        generationStrategy: "uuid",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "scout_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "present_date",
                        type: "date",
                    },
                    {
                        name: "daraz",
                        type: "boolean",
                    },
                    {
                        name: "paid",
                        type: "boolean",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["scout_id"],
                        referencedTableName: "scout",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //const usersTable = await queryRunner.getTable("users")
        //const rosterTable = await queryRunner.getTable("roster")
        const accoladeTable = await queryRunner.getTable("scout_accolades");
        const attendanceTable = await queryRunner.getTable("attendance");

        const fkAccoladeTable = accoladeTable?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("scout_id") !== -1
        );

        const fkAttendanceTable = attendanceTable?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("scout_id") !== -1
        );

        if (fkAccoladeTable) {
            await queryRunner.dropForeignKey(
                "scout_accolades",
                fkAccoladeTable
            );
        } else {
            console.log("Foreign key for Accolade Table not found");
        }

        if (fkAttendanceTable) {
            await queryRunner.dropForeignKey("attendance", fkAttendanceTable);
        } else {
            console.log("Foreign key for Attendance table not found");
        }

        await queryRunner.dropColumn("scout_accolades", "scout_id");
        await queryRunner.dropColumn("attendance", "scout_id");
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("scout");
        await queryRunner.dropTable("scout_accolades");
        await queryRunner.dropTable("attendance");
    }
}
