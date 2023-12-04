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

    @Column({ nullable: true})
    imgUrl: string

    @ManyToOne(() => UserEntity, (user) => user.portfolioEntries)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
}