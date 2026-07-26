import { EmailProvider } from './environment';

export const environment = {
  production: true,
  emailProvider: 'WEB3FORMS' as EmailProvider,
  web3Forms: {
    accessKey: '69473eb2-5483-4b03-96cc-a26558adedbb',
    endpoint: 'https://api.web3forms.com/submit',
  },
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
