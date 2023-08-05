export interface NotificationTemplate {
  title: string;
  template: string;
  context: {};
}

export interface EmailTemplate extends NotificationTemplate {
  subject: string;
  to: string;

  context:{
    content: string;
  }
}

export interface WelcomeTemplate extends NotificationTemplate {
  context: {
    username: string;
  };
}

export interface ConfirmationTemplate extends NotificationTemplate {
  context: {
    username:string;
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
