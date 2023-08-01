import { Module } from "@nestjs/common";
import { PersonalTaskController } from "./personal-task.controller";


@Module({
    controllers:[PersonalTaskController],
})
export class PersonalTaskModule{}