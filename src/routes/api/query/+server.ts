import { json } from '@sveltejs/kit';
// import weavi

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { query, collection_name } = await request.json();
	return json([
		{
			_additional: {
				certainty: 0.9161601066589355,
				distance: 0.16767979
			},
			content: 'Or the food?',
			sender: 'Sananshi Pidyar',
			time: '[9/11/22, 20:29:03]'
		},
		{
			_additional: {
				certainty: 0.9154893159866333,
				distance: 0.16902137
			},
			content: 'I nedd Ed d food',
			sender: 'Sananshi Pidyar',
			time: '[4/11/23, 13:42:35]'
		},
		{
			_additional: {
				certainty: 0.9153939783573151,
				distance: 0.16921204
			},
			content: 'Is the food here',
			sender: 'Sananshi Pidyar',
			time: '[5/7/23, 13:30:41]'
		},
		{
			_additional: {
				certainty: 0.9142441749572754,
				distance: 0.17151165
			},
			content: 'I WANT FOOODDDDD',
			sender: 'Sananshi Pidyar',
			time: '[4/12/23, 20:16:10]'
		},
		{
			_additional: {
				certainty: 0.9123806357383728,
				distance: 0.17523873
			},
			content: 'Do you have any food?',
			sender: 'Sananshi Pidyar',
			time: '[2/23/23, 21:05:03]'
		},
		{
			_additional: {
				certainty: 0.9123408496379852,
				distance: 0.1753183
			},
			content: 'i need food',
			sender: 'Sananshi Pidyar',
			time: '[4/28/23, 16:30:41]'
		},
		{
			_additional: {
				certainty: 0.9115667343139648,
				distance: 0.17686653
			},
			content: 'i need food',
			sender: 'Sananshi Pidyar',
			time: '[5/2/23, 12:50:01]'
		},
		{
			_additional: {
				certainty: 0.9111710786819458,
				distance: 0.17765784
			},
			content: 'I need food',
			sender: 'Sananshi Pidyar',
			time: '[5/21/23, 14:42:47]'
		},
		{
			_additional: {
				certainty: 0.9107587337493896,
				distance: 0.17848253
			},
			content: 'I want a lot of food',
			sender: 'Sananshi Pidyar',
			time: '[12/5/22, 17:31:27]'
		},
		{
			_additional: {
				certainty: 0.910010039806366,
				distance: 0.17997992
			},
			content: 'I thought it was some food',
			sender: 'Sananshi Pidyar',
			time: '[9/11/22, 13:04:50]'
		}
	]);
}
