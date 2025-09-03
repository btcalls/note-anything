describe('Sign In', () => {
  it('email .env variable should be available', () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const email = 'test@test.com';
    const isValidEmail = reg.test(email);

    expect(isValidEmail).toBeTruthy();
  });
});
