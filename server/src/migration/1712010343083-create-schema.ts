import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm";

enum Khoump {
    KYLIG = "kylig",
    ARDZVIG = "ardzvig",
    ARI = "ari",
    ARENOUSH = "arenoush",
    YERETS = "yerets",
    BARMANOUHI = "barmanouhi",
    KERAKOUYN = "kerakouyn",
}

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
                name: "roster",
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
                        enum: [
                            Khoump.ARDZVIG,
                            Khoump.KYLIG,
                            Khoump.ARENOUSH,
                            Khoump.ARI,
                            Khoump.BARMANOUHI,
                            Khoump.YERETS,
                            Khoump.KERAKOUYN,
                        ],
                        type: "enum",
                    },
                    {
                        name: "date_of_birth",
                        type: "date", // In PostgreSQL the format is 'YYYY-MM-DD'
                        isNullable: false,
                    },
                    {
                        name: "street",
                        type: "varchar",
                    },
                    {
                        name: "city",
                        type: "varchar",
                    },
                    {
                        name: "state",
                        type: "varchar",
                    },
                    {
                        name: "zip_code",
                        type: "varchar",
                    },
                    {
                        name: "contact_number",
                        type: "varchar",
                        length: "11",
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
                ],
            }),
            true //execute synchronously
        );

        await queryRunner.createTable(
            new Table({
                name: "scout_accolades",
                columns: [
                    {
                        name: "id",
                        isNullable: false,
                        generationStrategy: "uuid",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "roster_id",
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
                        columnNames: ["roster_id"],
                        referencedTableName: "roster",
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
                        name: "id",
                        isNullable: false,
                        generationStrategy: "uuid",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "roster_id",
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
                        columnNames: ["roster_id"],
                        referencedTableName: "roster",
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
            (fk) => fk.columnNames.indexOf("roster_id") !== -1
        );

        const fkAttendanceTable = attendanceTable?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("roster_id") !== -1
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

        await queryRunner.dropColumn("scout_accolades", "roster_id");
        await queryRunner.dropColumn("attendance", "roster_id");
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("roster");
        await queryRunner.dropTable("scout_accolades");
        await queryRunner.dropTable("attendance");
    }
}
