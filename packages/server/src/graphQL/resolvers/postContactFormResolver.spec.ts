import { contactFormConnectionMock, recaptchaConnectionMock } from '../../test';

import resolvers from '.';

describe('#postContactForm', () => {
  const contactFormData = {
    name: 'Tester',
    company: 'Innovatrics',
    email: 'test@innovatrics.com',
    message: 'Test',
    checked: true,
  };

  const recaptchaToken = 'abc';

  it('should post contact form correctly', async () => {
    const result = resolvers.Mutation.postContactForm(null, { contactFormData, recaptchaToken });

    await expect(result).resolves.toBeUndefined();
  });

  it('should throw error when recaptcha validation failed', async () => {
    const apiError = {
      success: false,
      'error-codes': ['missing-input-secret'],
    };

    recaptchaConnectionMock.onPost().reply(() => [200, apiError]);

    const result = resolvers.Mutation.postContactForm(null, { contactFormData, recaptchaToken });

    await expect(result).rejects.toThrow();
  });

  it('should throw error when recaptcha score is below threshold', async () => {
    const apiError = {
      success: true,
      score: 0.4,
    };

    recaptchaConnectionMock.onPost().reply(() => [200, apiError]);

    const result = resolvers.Mutation.postContactForm(null, { contactFormData, recaptchaToken });

    await expect(result).rejects.toThrow();
  });

  it('should throw error when contact form validation failed', async () => {
    const apiError = {
      status: 'validation_failed',
      invalid_fields: [
        {
          into: 'span.wpcf7-form-control-wrap.contact-form-name',
          message: 'The field is required.',
          idref: 'contact-form-name',
          error_id: '-ve-contact-form-name',
        },
      ],
    };

    contactFormConnectionMock.onPost().reply(() => [200, apiError]);

    const result = resolvers.Mutation.postContactForm(null, { contactFormData, recaptchaToken });

    await expect(result).rejects.toThrow();
  });
});
