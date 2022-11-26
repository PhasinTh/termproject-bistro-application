export interface SendWelcomeEmailDTO {
  name: string;
  email: string;
  subject: string;
  header?: string;
  message?: string;
}
