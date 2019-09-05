import Auth from './Auth';

describe('Auth.constructor', () => {
  it('Should assign this.auth2 to null', () => {
    const auth = new Auth();
    expect(auth.auth2).toBeNull();
  });
});
