import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";


@Module({
    imports:[],
    providers:[CommentController],
})
export class CommentModule{}