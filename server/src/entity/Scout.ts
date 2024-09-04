import BaseModel from "./BaseModel";
import { Column, Entity } from "typeorm";

// enum Khoump {
//     KYLIG = "kylig",
//     ARDZVIG = "ardzvig",
//     ARI = "ari",
//     ARENOUSH = "arenoush",
//     YERETS = "yerets",
//     BARMANOUHI = "barmanouhi",
//     KERAKOUYN = "kerakouyn",
// }

const Khoump = [
    "mogli",
    "kylig",
    "ardzvig",
    "ari",
    "arenoush",
    "yerets",
    "barmanouhi",
    "kerakouyn",
];

const shirt_size = [
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
];

@Entity({ name: "scout" })
export class Scout extends BaseModel {
    @Column({ type: "varchar", length: 15 })
    first_name: string;

    @Column({ type: "varchar", length: 15 })
    last_name: string;

    @Column({ type: "enum", enum: Khoump })
    khoump: string;

    @Column({ type: "date" })
    date_of_birth: Date;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zip_code: string;

    @Column({ type: "varchar", length: 11 })
    contact_number: string;

    @Column({ type: "citext" })
    contact_email: string;

    @Column()
    parent_name: string;

    @Column({ type: "citext" })
    parent_email: string;

    @Column({ type: "varchar", length: 11 })
    parent_number: string;

    @Column()
    allergies: string;

    @Column({ type: "enum", enum: shirt_size })
    size: string;

    @Column({ type: "enum", enum: ["ACTIVE", "INACTIVE", "PENDING"] })
    status: string;
}
