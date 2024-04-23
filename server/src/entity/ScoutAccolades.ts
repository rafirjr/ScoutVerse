import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Scout } from "./Scout";

@Entity({ name: "scoutaccolades" })
export class ScoutAccolades extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    accolade_id: string;

    @ManyToOne(() => Scout, (scout) => scout)
    @JoinColumn({ name: "scout_id" })
    scout: Scout;
    @Column()
    scout_id: string;

    @Column({
        type: "enum",
        enum: [
            "norakir",
            "norendza",
            "pen gark",
            "ayp gark",
            "vgayal",
            "araratian",
        ],
    })
    gark_accolade: string;

    @Column({ type: "date" })
    gark_date: Date;

    @Column({
        type: "enum",
        enum: [
            "pokh_arachnort",
            "arachnort",
            "vareech_arachnort",
            "pokh_khmpabed",
            "khmpabed",
        ],
    })
    astijan_accolade: string;

    @Column({ type: "date" })
    astijan_date: Date;

    @Column({
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
    })
    bashdon_accolade: string;

    @Column({ type: "date" })
    bashdon_date: Date;
}
