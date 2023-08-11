import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateDtoValidationPipe implements PipeTransform {
  options: string[];

  constructor(options?: string[]) {
    this.options = options;
  }
  transform(dto: any) {
    console.log(dto);
    const errorMsgs: string[] = [];
    let nonEmptyFields: number = this.options.length;

    this.options.forEach((key) => {
      if (!(key in dto)) nonEmptyFields--;
      else if (!dto[key]) {
        errorMsgs.push(`${key} can't be empty`);
      }
    });
    console.log(nonEmptyFields);
    if (!Object.keys(dto).length || !nonEmptyFields)
      throw new BadRequestException('no valid fields present to update');
    else if (errorMsgs.length > 0) throw new BadRequestException(errorMsgs);

    return dto;
  }
}
