import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { User } from 'src/domain/entities';
import { UpdateUserDto } from '../dtos';

@Injectable()
export class UpdateUserDtoValidationPipe implements PipeTransform<any> {
  async transform(dto: UpdateUserDto) {
    const { name, profile_pic } = dto;

    if (Object.keys(dto).length <= 1)
      throw new BadRequestException('provide atleast 1 field to update');
    else if (name === null) throw new BadRequestException("name can't be null");

    return dto;
  }
}
