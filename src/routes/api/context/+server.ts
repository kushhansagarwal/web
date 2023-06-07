import { json } from '@sveltejs/kit';
import weaviate from 'weaviate-ts-client';
import { API_KEY } from '$env/static/private';
import { WEAVIATE } from '$env/static/private';
// import { API_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { time, chat } = await request.json();
    console.log(time, chat)
	const client = weaviate.client({
		scheme: 'http',
		host: 'text-gpt-3zss9391.weaviate.network',
		headers: { 'X-OpenAI-Api-Key': API_KEY },
		apiKey: new weaviate.ApiKey(WEAVIATE)
	});

	const res = await client.graphql
		.get()
		.withClassName('Text')
		.withFields('time sender chat content image _additional { distance certainty }')
		.withWhere({
			operator: 'And',
			operands: [
				{
					path: ['time'],
					operator: 'LessThanEqual',
					valueNumber: time + 300000
				},
				{
					path: ['time'],
					operator: 'GreaterThanEqual',
					valueNumber: time - 300000
				}
			]
		})
		.withLimit(20)
		.do();

	console.log(JSON.stringify(res, null, 2));

	const data = res.data.Get.Text;

	return json(data);
}
