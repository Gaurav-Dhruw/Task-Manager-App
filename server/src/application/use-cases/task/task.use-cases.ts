import {
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Task} from 'src/domain/entities';

@Injectable()
export class TaskUseCases {
  constructor(
    private readonly dataService: IDataService,
  ) {}


}
