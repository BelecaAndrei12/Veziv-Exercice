import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { PortfolioService } from "./portfolio-entry.service";
import { CreateEntryDto } from "./models/dtos/create-entry.dto";

@Controller('portfolio-entry')
export class PortfolioEntryController {
    constructor(
        private portfolioService: PortfolioService,
    ) {}


    @Post()
    async createPortfolioEntry(@Body() createEntryDto: CreateEntryDto) {
        try {
            const entry = await this.portfolioService.createEntry(createEntryDto)
            return {message:'Entry created succesfully', entry}
        }   catch (error) {
            throw new HttpException({ error: error.message }, error.status);
          } 
    }

    @Get(':userId')
    async getAllEntriesForUser(@Param('userId') userId: number) {
        try {
            return this.portfolioService.getAllEntriesForUser(userId)
        } catch (error) {
            throw new HttpException({ error: error.message }, error.status);
          } 

    }
}
