import { UserEntity } from "src/user/model/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PortfolioEntryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    customerUrl: string;

    @Column({type: 'bytea', nullable: true})
    img: Buffer | null;

    @ManyToOne(() => UserEntity, (user) => user.portfolioEntries)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}