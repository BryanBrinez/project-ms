import { IsDate, IsString } from "class-validator";

export class CreateTaskDto {


    @IsString()
    title: string;
    @IsString()
    description: string;

    @IsDate()
    dueDate: Date;


    @IsString()
    status: string;

    @IsString()
    assignedTo?: string;
}