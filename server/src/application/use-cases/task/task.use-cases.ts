import {
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';

@Injectable()
export class TaskUseCases {
  constructor(
    private readonly dataService: IDataService,
  ) {}


}
