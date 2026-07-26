import { EmailProvider } from './environment';

export const environment = {
  production: true,
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
