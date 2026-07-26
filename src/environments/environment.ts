export type EmailProvider = 'WEB3FORMS' | 'FORMSUBMIT' | 'EMAILJS';

export const environment = {
  production: false,
  emailProvider: 'WEB3FORMS' as EmailProvider,
  formSubmit: {
    email: 'your-email@domain.com',
    endpoint: 'https://formsubmit.co/ajax/',
  },
  emailJs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },
};
