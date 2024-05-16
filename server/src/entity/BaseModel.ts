import {
    BaseEntity,
    BeforeInsert,
    CreateDateColumn,
    //PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

export default abstract class Model extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuidv4();

    // @PrimaryColumn({ type: "uuid", primary: true })
    // id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}
