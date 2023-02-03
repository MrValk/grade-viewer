import { fail, type Actions } from '@sveltejs/kit';
import { Magister } from 'magister-scraper';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const school = data.get('school') as string;

		if (!username || !password || !school)
			return fail(400, { message: 'Missing username, password or school' });

		console.log('Username:', username);
		console.log('password:', password);
		console.log('school:', school);

		let client;
		try {
			client = await Magister.new({
				username,
				password,
				hostname: `${school}.magister.net`
			});
		} catch (error) {
			console.log(error);
			const err = error as Error;
			return fail(400, { message: err.message });
		}

		console.log(client);
	}
} satisfies Actions;
