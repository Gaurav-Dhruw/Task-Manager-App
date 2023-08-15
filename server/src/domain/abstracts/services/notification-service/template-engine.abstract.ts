import { INotificationTemplate } from "src/domain/types";

export abstract class ITemplateEngine {
    abstract convert(data:INotificationTemplate):string;

}