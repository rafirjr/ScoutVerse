import { Entity, Column, BeforeInsert } from "typeorm";
import Model from "./BaseModel";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "users" })
export class User extends Model {
    @Column({ type: "varchar", length: 20 })
    username: string;

    @Column()
    passwordHash: string;

    @Column({ type: "varchar" })
    firstname: string;

    @Column({ type: "varchar" })
    lastname: string;

    @BeforeInsert()
    generateId(): void {
        this.id = uuidv4();
    }
}
