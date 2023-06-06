import { json } from '@sveltejs/kit';
import weaviate from 'weaviate-ts-client';
import { API_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { query, collection_name } = await request.json();
	const client = weaviate.client({
		scheme: 'http',
		host: 'chat-test-yw81eqbz.weaviate.network',
		headers: { 'X-OpenAI-Api-Key': API_KEY }
	});

	const nearText = {
		concepts: [query],
		distance: 0.7
	};

	const res = await client.graphql
		.get()
		.withClassName('Text')
		.withFields('time sender content _additional { distance certainty }')
		.withWhere({
			operator: 'And',
			operands: [
				{
					operator: 'Or',
					operands: [
						{
							path: ['sender'],
							operator: 'Equal',
							valueText: 'Kush'
						},
						{
							path: ['sender'],
							operator: 'Equal',
							valueText: 'Sananshi Pidyar'
						}
					]
				},
				{
					path: ['content'],
					operator: 'NotEqual',
					valueText: 'image omitted'
				}
			]
		})
		.withNearText(nearText)
		.withLimit(20)
		.do();

	console.log(JSON.stringify(res, null, 2));

	const data = res.data.Get.Text;

	return json(data);
}
