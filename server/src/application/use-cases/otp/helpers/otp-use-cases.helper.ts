

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Otp } from 'src/domain/entities';

@Injectable()
export class OtpUseCasesHelper {
    constructor() {}

    generateCode(options?:{length?:number}):string {
        const {length=6} = options || {};
        const digits:string = '0123456789';
        const charLength = digits.length;
        let code:string = '';
        
        while(code.length < length){
            const idx = Math.floor(Math.random()*charLength);
            code += digits[idx];
        }

        return code;
    }


    
}