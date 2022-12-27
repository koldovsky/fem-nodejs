import * as user from '../users';

describe('user handler', () => {
    it('should create a new user', async () => {
        const req = {
            body: {
                username: 'test1',
                password: 'test2',
            }
        };
        const res = {
            json({ token }) {
                console.log(token);
                expect(token).toBeDefined();
            },
        };
        const newUser = await user.createNewUser(req, res, null);

    });
});
