import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';
import { ITemplateEngine } from 'src/domain/abstracts';
import { INotificationTemplate } from 'src/domain/types';

export class TemplateEngine implements ITemplateEngine {
  private handlebars: typeof handlebars;
  constructor() {
    this.handlebars = handlebars;
  }

  convert(data: INotificationTemplate): string {
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
