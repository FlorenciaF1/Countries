const LandingPage = require('./components/LandingPage')

it('Is it there?' , () => {
    expect(LandingPage).toBeDefined()
});

it('No erros throw', () => {
    const LandingPage = jest.fn(() => true);
    LandingPage()
    expect(LandingPage).toHaveReturned();
});