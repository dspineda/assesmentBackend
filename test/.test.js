const supertest = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../index');
const User = require('../api/users/users.model');
const Favorites = require('../api/favorites/favorites.model');
const api = supertest(app);

const initialUsers = [
	{
		userName: 'testUser',
		name: 'Test name',
		lastName: 'Test last name',
		email: 'daip@mail.com',
		password: 'testPassworD12',
		favoritesList: [],
	},
	{
		userName: 'testUser2',
		name: 'Test name 2',
		lastName: 'Test last name 2',
		email: 'werw@mail.com',
		password: 'testPassworD15',
		favoritesList: [],
	},
];

beforeEach(async () => {
	await User.deleteMany({});
	await Favorites.deleteMany({});

	const user1 = new User(initialUsers[0]);
	await user1.save();

	const user2 = new User(initialUsers[1]);
	await user2.save();
}, 1000000);

describe('USERS', () => {
	test('Get all users', async () => {
		const response = await api.get('/api/users');
		expect(response.body).toHaveLength(2);
	});

	test('POST Register', async () => {
		const newUser = {
			userName: 'Steven',
			email: 'david@mail.com',
			password: '*/abCD12',
			name: 'dav',
			lastName: 'Pinded',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/users');
		const contents = response.body.map(user => user.userName);
		expect(response.body).toHaveLength(initialUsers.length + 1);
		expect(contents).toContain(newUser.userName);
	});

	test('POST SignIn', async () => {
		const signIn = {
			email: 'daip@mail.com',
			password: 'testPassworD12',
		};

		const response = await api
			.post('/api/auth/local/login')
			.send(signIn)
			.expect(200);

		const token = response.body.token;
		expect(token).toBeDefined();
	});
});

describe('FAVORITES', () => {
	test('GET all favorites', async () => {
		const signIn = {
			email: 'werw@mail.com',
			password: 'testPassworD15',
		};

		const response = await api.post('/api/auth/local/login').send(signIn);
		const token = response.body.token;
		const response2 = await api
			.get('/api/favs')
			.set('Authorization', `Bearer ${token}`);
		expect(response2.body).toHaveLength(0);
		expect(200);
	});

	test('POST Create favorite', async () => {
		const signIn = {
			email: 'werw@mail.com',
			password: 'testPassworD15',
		};

		const response = await api.post('/api/auth/local/login').send(signIn);
		const token = response.body.token;
		const newFavorite = {
			title: 'testTitle',
			description: 'testDescription',
			url: 'testUrl',
			name: 'testName',
		};
		await api
			.post('/api/favs')
			.set('Authorization', `Bearer ${token}`)
			.send(newFavorite)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		const response2 = await api
			.get('/api/favs')
			.set('Authorization', `Bearer ${token}`);
		const contents = response2.body.map(favorite => favorite.title);
		expect(response2.body).toHaveLength(1);
		expect(contents).toContain(newFavorite.title);
	}, 100000);

	test('GET favorite by id', async () => {
		const signIn = {
			email: 'werw@mail.com',
			password: 'testPassworD15',
		};

		const response = await api.post('/api/auth/local/login').send(signIn);
		const token = response.body.token;
		const newFavorite = {
			title: 'testTitle',
			description: 'testDescription',
			url: 'testUrl',
			name: 'testName',
		};
		const response2 = await api
			.post('/api/favs')
			.set('Authorization', `Bearer ${token}`)
			.send(newFavorite)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		const response3 = await api
			.get(`/api/favs/${response2.body._id}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response3.body.title).toBe(newFavorite.title);
	}, 100000);

	test('DELETE favorite by id ', async () => {
		const signIn = {
			email: 'werw@mail.com',
			password: 'testPassworD15',
		};

		const response = await api.post('/api/auth/local/login').send(signIn);
		const token = response.body.token;
		const newFavorite = {
			title: 'testTitle',
			description: 'testDescription',
			url: 'testUrl',
			name: 'testName',
		};
		const response2 = await api
			.post('/api/favs')
			.set('Authorization', `Bearer ${token}`)
			.send(newFavorite)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		await api
			.delete(`/api/favs/${response2.body._id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
		const response3 = await api
			.get('/api/favs')
			.set('Authorization', `Bearer ${token}`);
		const contents = response3.body.map(favorite => favorite.title);
		expect(response3.body).toHaveLength(0);
		expect(contents).not.toContain(newFavorite.title);
	}, 100000);
});

afterAll(() => {
	mongoose.connection.close();
	server.close();
});
