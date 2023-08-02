import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class UpdateCommentDto{

    @IsString()
    @IsNotEmpty()
    content:string;
}