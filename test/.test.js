const supertest = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../index');
const User = require('../api/users/users.model');
const Favorites = require('../api/listFavorites/listFavorite.model');
const api = supertest(app);

const initialUsers = [
	{
		email: 'daip@mail.com',
		password: 'testPassworD12',
	},
	{
		email: 'werw@mail.com',
		password: 'testPassworD15',
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
	test('POST Register', async () => {
		const newUser = {
			email: 'david@mail.com',
			password: '*/abCD12',
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
	test('GET all favorites by user', async () => {
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
			name: 'My favorite',
			items: [
				{
					title: 'My item',
					description: 'My description',
					url: 'https://myurl.com',
				},
			],
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
			name: 'My favorite',
			items: [
				{
					title: 'My item',
					description: 'My description',
					url: 'https://myurl.com',
				},
			],
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

	test('PATCH favorite by id', async () => {
		const signIn = {
			email: 'werw@mail.com',
			password: 'testPassworD15',
		};

		const response = await api.post('/api/auth/local/login').send(signIn);
		const token = response.body.token;
		const newFavorite = {
			name: 'My favorite',
			items: [
				{
					title: 'My item',
					description: 'My description',
					url: 'https://myurl.com',
				},
			],
		};
		const response2 = await api
			.post('/api/favs')
			.set('Authorization', `Bearer ${token}`)
			.send(newFavorite)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		const response3 = await api
			.patch(`/api/favs/${response2.body._id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'My favorite updated' })
			.expect(200)
			.expect('Content-Type', /application\/json/);
		expect(response3.body.name).toBe('My favorite updated');
	}, 100000);

	test('DELETE favorite by id ', async () => {
		const signIn = {
			email: 'werw@mail.com',
			password: 'testPassworD15',
		};

		const response = await api.post('/api/auth/local/login').send(signIn);
		const token = response.body.token;
		const newFavorite = {
			name: 'My favorite',
			items: [
				{
					title: 'My item',
					description: 'My description',
					url: 'https://myurl.com',
				},
			],
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

describe('Favorite items', () => {
	test('POST favorite items', async () => {
		const signIn = {
			email: 'werw@mail.com',
			password: 'testPassworD15',
		};

		const response = await api.post('/api/auth/local/login').send(signIn);
		const token = response.body.token;
		const newFavorite = {
			name: 'My favorite for add item',
			items: [
				{
					title: 'My Music',
					description: 'My description',
					url: 'https://myurl.com',
				},
			],
		};
		const response2 = await api
			.post('/api/favs')
			.set('Authorization', `Bearer ${token}`)
			.send(newFavorite)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		const newItem = {
			title: 'My item 2 Video',
			description: 'My description 2',
			url: 'https://myurl2.com',
		};
		const response3 = await api
			.post(`/api/favs/${response2.body._id}/items`)
			.set('Authorization', `Bearer ${token}`)
			.send(newItem)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		expect(response3.body.items).toHaveLength(2);
	}, 100000);
});

afterAll(() => {
	mongoose.connection.close();
	server.close();
});
