class RequiredError extends Error {
  public field = '';

  name = 'RequiredError';

  constructor(_field: string, msg?: string) {
    super(msg);
  }
}

export default RequiredError;
