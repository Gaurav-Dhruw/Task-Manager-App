import { Module } from "@nestjs/common";
import { CommentUseCases } from "./comment.use-cases";
import { CommentUseCasesHelper } from "./comment-use-cases.helper";


@Module({
    imports:[],
    providers:[CommentUseCases, CommentUseCasesHelper],
    exports:[CommentUseCases]
})
export class CommentUseCasesModule{}