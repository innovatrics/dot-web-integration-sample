import { initContactFormaMocks } from '../api/mocks/contactFormMockAdapter';
import { initRecaptchaMocks } from '../api/mocks/recaptchaMockAdapter';
import { initServerMocks } from '../api/mocks/serverMockAdapter';
import { serverConnection, googleRecaptchaConnection, contactFormConnection } from '../api/rest/serverConnection';

initServerMocks(serverConnection);
initRecaptchaMocks(googleRecaptchaConnection);
initContactFormaMocks(contactFormConnection);
