import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PortfolioEntryEntity } from "./models/portfolio-entry.entity";
import { Repository } from "typeorm";
import { CreateEntryDto } from "./models/dtos/create-entry.dto";
import { UserService } from "src/user/user.service";
import { PatchEntryDto } from "./models/dtos/patch-entry.dto";

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(PortfolioEntryEntity)
        private portfolioRepo: Repository<PortfolioEntryEntity>,
        private userService: UserService
    ) {}


    async createEntry(createEntryDto: CreateEntryDto):Promise<PortfolioEntryEntity>{
        const user = await this.userService.getUserById(createEntryDto.userId)

        if(!user) {
            throw new NotFoundException(`User with ID ${createEntryDto.userId} not found`);
        }

        const entry  = {
            title: createEntryDto.title,
            description: createEntryDto.description,
            customerUrl: createEntryDto.customerUrl,
            user
        }

        return this.portfolioRepo.save(entry)

    }


    async getAllEntriesForUser(userId: number): Promise<PortfolioEntryEntity[]> {
        const user = await this.userService.getUserById(userId);

        if(!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return this.portfolioRepo
        .createQueryBuilder('portfolioEntry')
        .where('portfolioEntry.userId = :userId', { userId })
        .getMany();
    }


    async updateEntry(entryId: number, patchEntryDto: PatchEntryDto): Promise<PortfolioEntryEntity> {
        const existingEntry  = await this.portfolioRepo.findOne({ where: {id: entryId} })

        if (!existingEntry) {
            throw new NotFoundException(`Portfolio Entry with ID ${entryId} not found`);
        }

        Object.assign(existingEntry, patchEntryDto);
        return this.portfolioRepo.save(existingEntry);
    }


    async deleteEntry(entryId: number): Promise<void>  {
        const existingEntry = await this.portfolioRepo.findOne({ where: { id: entryId } });

        if (!existingEntry) {
            throw new NotFoundException(`Portfolio Entry with ID ${entryId} not found`);
        }
        await this.portfolioRepo.remove(existingEntry)
    }
    
}
