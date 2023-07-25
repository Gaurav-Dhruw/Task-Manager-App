import { Module } from "@nestjs/common";
import { IHashService } from "src/domain/abstracts";
import { BcryptService } from "./bcrypt.service";


@Module({

    exports:[{
        provide: IHashService,
        useClass: BcryptService,
    }],

})
export class HashServiceModeule {}