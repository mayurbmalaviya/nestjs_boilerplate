import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TbTests {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column()
    address: string;
}