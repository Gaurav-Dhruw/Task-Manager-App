import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class UpdateCommentDto{
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    content:string;
}