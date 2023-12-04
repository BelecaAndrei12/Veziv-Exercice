import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateEntryDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    
    @IsUrl()
    @IsNotEmpty()
    customerUrl: string;

    @IsNotEmpty()
    userId: number;
}