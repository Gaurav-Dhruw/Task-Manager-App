import { NotificationTemplate } from "src/domain/types";

export abstract class ITemplateEngine {
    abstract convert(data:NotificationTemplate):string;

}