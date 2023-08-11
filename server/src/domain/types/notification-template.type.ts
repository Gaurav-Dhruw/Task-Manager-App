export interface INotificationTemplate {
  template: string;
  context: object;
}

export interface IWelcomeTemplate extends INotificationTemplate {
  context: {
    username: string;
  };
}

export interface IReminderTemplate extends INotificationTemplate {
  context: {
    username: string;
    task_name: string;
    reminder_schedule: Date;
  };
}

export interface IGenericEmailTemplate extends INotificationTemplate {
  subject: string;
  to: string;
}

export interface IEmailTemplate extends IGenericEmailTemplate {
  context: {
    content: string;
  };
}

export interface IOtpTemplate extends IGenericEmailTemplate {
  context: {
    username: string;
    code: string;
  };
}

export interface IVerificationTemplate extends IGenericEmailTemplate {
  context: {
    username: string;
    verification_url: string;
  };
}
