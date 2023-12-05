import { PortfolioEntryEntity } from "src/portfolio-entry/models/portfolio-entry.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({nullable: true})
    description: string;

    @Column({ unique: true})
    email: string

    @Column()
    password: string

    @Column({type: 'bytea', nullable: true})
    profileImage:Buffer

    @OneToMany(() => PortfolioEntryEntity, (portfolioEntry) => portfolioEntry.user)
    portfolioEntries: PortfolioEntryEntity[];
}
