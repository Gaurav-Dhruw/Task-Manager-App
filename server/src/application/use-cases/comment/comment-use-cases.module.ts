import { Module } from "@nestjs/common";
import { CommentUseCases } from "./comment.use-cases";


@Module({
    imports:[],
    providers:[CommentUseCases],
    exports:[CommentUseCases]
})
export class CommentUseCasesModule{}