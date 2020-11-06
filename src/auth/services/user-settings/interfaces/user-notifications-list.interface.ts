export interface IUserNotificationsList {
  userIdsForAppNotification: Array<string>;
  userEmailsForEmailNotification: Array<IEmailUserDetails>;
}

export interface IEmailUserDetails {
  email: string;
  name: string;
}
