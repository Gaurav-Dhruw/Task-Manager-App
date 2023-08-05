import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';
import {
  IAppNotificationService,
  IEmailNotificationService,
  INotificationService,
} from 'src/domain/abstracts';
import { NotificationTemplate } from 'src/domain/types';

@Injectable()
export class NotificationService implements INotificationService {
  handlebars: typeof handlebars;
  constructor(
    readonly email: IEmailNotificationService,
    readonly app: IAppNotificationService,
  ) {
    this.handlebars = handlebars;
  }

  toTemplateString(data: NotificationTemplate): string {
    const filePath = join(
      __dirname,
      'notification-templates',
      data.template + '.hbs',
    );
    const templateSource = readFileSync(filePath).toString();

    const template = this.handlebars.compile(templateSource);

    const renderedTemplate = template(data.context);

    return renderedTemplate;
  }
}
