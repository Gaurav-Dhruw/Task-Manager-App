import { Module } from "@nestjs/common";
import { TeamUseCases } from "./team.use-cases";


@Module({
    providers:[TeamUseCases],
    exports:[TeamUseCases],
})
export class TeamUseCasesModule{}