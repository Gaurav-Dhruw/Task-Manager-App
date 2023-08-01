import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateDtoValidationPipe implements PipeTransform {
  options: string[];

  constructor(options?: string[]) {
    this.options = options;
  }
  transform(dto: any) {
    console.log(dto);
    if (Object.keys(dto).length <= 1)
      throw new BadRequestException('No valid fields to update');
    else if (this.options) {
      const errorMsgs: string[] = [];
      this.options.forEach((key) => {
        if (dto[key] === null) errorMsgs.push(`${key} can't be null`);
      });

      if (errorMsgs.length > 0) throw new BadRequestException(errorMsgs);
    }
    return dto;
  }
}
