const expect = require('expect');
const Users = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: 2,
                name: 'Jen',
                room: 'React Course'
            },
            {
                id: 3,
                name: 'Julie',
                room: 'Node Course'
            }
        ]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '1234',
            name: 'Andrew',
            room: 'The Office Fans'
        };

        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for Node Course', () => {
        let userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React Course', () => {
        let userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });

    it('should find a user with a the given socket id', () => {
        let user = users.getUser(1);
        expect(user).toEqual({
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        });
    });

    it('should not find user', () => {
        let user = users.getUser(10000);
        expect(user).toBe(undefined);
    });

    it('should remove the user with the given socket id and return that removed user', () => {
        let user = users.removeUser(1);
        expect(user.id).toBe(1);
        expect(users.users.length).toBe(2);
        expect(users.users).toEqual([{
            id: 2,
            name: 'Jen',
            room: 'React Course'
        },
        {
            id: 3,
            name: 'Julie',
            room: 'Node Course'
        }])
    });

    it('should not remove the user with the given socket id does not exist', () => {
        let user = users.removeUser(100000000);
        expect(users.users.length).toBe(3);
        expect(users.users).toEqual([
            {
                id: 1,
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: 2,
                name: 'Jen',
                room: 'React Course'
            },
            {
                id: 3,
                name: 'Julie',
                room: 'Node Course'
            }])
    });
});