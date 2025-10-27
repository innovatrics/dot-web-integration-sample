import { initContactFormaMocks } from '../api/mocks/contactFormMockAdapter.js';
import { initRecaptchaMocks } from '../api/mocks/recaptchaMockAdapter.js';
import { initServerMocks } from '../api/mocks/serverMockAdapter.js';
import { contactFormConnection, disClient, googleRecaptchaConnection } from '../api/rest/serverConnection.js';

initServerMocks(disClient.instance);
initRecaptchaMocks(googleRecaptchaConnection);
initContactFormaMocks(contactFormConnection);
