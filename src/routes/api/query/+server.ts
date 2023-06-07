import { json } from '@sveltejs/kit';
import weaviate from 'weaviate-ts-client';
import { API_KEY } from '$env/static/private';
import { WEAVIATE } from '$env/static/private';
// import { API_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { query, chat } = await request.json();
	const client = weaviate.client({
		scheme: 'http',
		host: 'text-gpt-3zss9391.weaviate.network',
		headers: { 'X-OpenAI-Api-Key': API_KEY },
		apiKey: new weaviate.ApiKey(WEAVIATE)
	});

	const nearText = {
		concepts: [query],
		distance: 0.7
	};

	const res = await client.graphql
		.get()
		.withClassName('Text')
		.withFields('time sender chat content image _additional { distance certainty }')
		.withWhere({
			path: ['chat'],
			operator: 'Equal',
			valueText: chat
		})
		.withSort([{
			order: 'desc',
			path: ['time']
		}])
		.withNearText(nearText)
		.withLimit(20)
		.do();

	console.log(JSON.stringify(res, null, 2));

	const data = res.data.Get.Text;

	return json(data);
}
