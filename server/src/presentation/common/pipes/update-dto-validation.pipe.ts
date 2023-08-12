import { BadRequestException, Injectable, PipeTransform,  } from '@nestjs/common';

@Injectable()
export class UpdateDtoValidationPipe implements PipeTransform {
  nonEmptyFields: string[];
  minSize: number;

  constructor(options?: { nonEmptyFields?: string[]; minSize?: number }) {
    this.nonEmptyFields = options?.nonEmptyFields ?? [];
    this.minSize = options?.minSize ?? 1;
  }
  transform(dto: any) {
    console.log(dto);
    const errorMsgs: string[] = [];

    this.nonEmptyFields.forEach((key) => {
      if (key in dto && !dto[key]) {
        errorMsgs.push(`${key} can't be empty`);
      }
    });

    if (Object.keys(dto).length < this.minSize)
      throw new BadRequestException('no valid fields present to update');
    else if (errorMsgs.length > 0) throw new BadRequestException(errorMsgs);

    return dto;
  }
}
