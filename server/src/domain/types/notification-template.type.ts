export interface NotificationTemplate {
  template: string;
  context: object;
}

export interface EmailTemplate extends Omit<NotificationTemplate, 'title' | 'template'>  {
  subject: string;
  to: string;

  context: {
    title:string;
    content: string;
  };
}

export interface WelcomeTemplate extends NotificationTemplate {
  context: {
    username: string;
  };
}

export interface ConfirmationTemplate extends NotificationTemplate {
  context: {
    username: string;
    verification_url: string;
  };
}

export interface ReminderTemplate extends NotificationTemplate {
  context: {
    username: string;
    task_name: string;
    reminder_schedule: Date;
  };
}
