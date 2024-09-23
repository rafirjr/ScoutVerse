import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Scout } from "./Scout";

@Entity({ name: "attendance" })
export class Attendance extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    attendance_id: string;

    @ManyToOne(() => Scout, (scout) => scout)
    @JoinColumn({ name: "scout_id" })
    scout: Scout;
    @Column()
    scout_id: string;

    @Column({ type: "varchar" })
    present_date: string;

    @Column({ type: "boolean" })
    daraz: boolean;

    @Column({ type: "boolean" })
    paid: boolean;
}
