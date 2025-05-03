import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsNumber()
    @IsNotEmpty()
    salary: number

    @IsNumber()
    @IsNotEmpty()
    companyValue: number
}