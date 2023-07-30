import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateTeamDto } from '../dtos';

@Injectable()
export class UpdateTeamDtoValidationPipe implements PipeTransform {
  transform(dto: UpdateTeamDto) {
    const { team_name, display_pic } = dto;

    if (Object.keys(dto).length <= 1)
      throw new BadRequestException('provide atleast 1 field to update');
    else if (team_name === null) {
      throw new BadRequestException("team_name can't be null");
    }

    return dto;
  }
}
