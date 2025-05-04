import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', {precision: 10, scale: 2})
    salary: number;

    @Column('decimal', {precision: 10, scale: 2})
    companyValue: number; 
}