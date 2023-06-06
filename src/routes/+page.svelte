<script lang="ts">
	import { json } from '@sveltejs/kit';
	import { text } from './stores';

	function parseDateTimeString(dateTimeString: string): Date {
		// remove first and last character from the string
		dateTimeString = dateTimeString.slice(1, -1);
		const dateParts = dateTimeString.split(',');
		const date = dateParts[0].split('/');
		const time = dateParts[1].split(':');

		// Validate the date parts
		if (dateParts.length !== 2) {
			throw new Error('Invalid date string');
		}

		const month = parseInt(date[0]);
		const day = parseInt(date[1]);
		const year = parseInt(20+date[2]);
		const hour = parseInt(time[0]);
		const minute = parseInt(time[1]);
		const second = parseInt(time[2]);
		console.log(dateTimeString, year, month, day, hour, minute, second);

		return new Date(year, month - 1, day, hour, minute, second);
	}

	async function getTexts() {
		const res = await fetch('http://127.0.0.1:5000/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collection_name: 'Text',
				query: $text
			})
		});

		texts = await res.json();

		if (res.ok) {
			return texts;
		} else {
			throw new Error(res.statusText);
		}
	}

	let promise = getTexts();

	interface Text {
		time: string;
		sender: string;
		content: string;
		_additional: string;
	}
	var texts: Text[] = [];
</script>

<div>
	<div class="navbar rounded-lg m-3 bg-base-200">
		<p class="btn btn-ghost normal-case text-xl">a trip down memory lane</p>
	</div>
	<div class="w-full m-3 text-center">
		<input
			bind:value={$text}
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-lg"
		/>
		<button
			class="btn btn-primary"
			on:click={async () => {
				promise = getTexts();
			}}>go!</button
		>
	</div>
	<div class="divider" />

	<!-- make a list of tiles -->
	<div class="grid grid-cols-3">
		{#await promise}
			<p>...waiting</p>
		{:then texts}
			{#each texts as text}
				<div class="bg-base-300 p-5 rounded-xl m-2 text-center">
					<div class="chat chat-start">
						<div class="chat-image avatar">
							<div class="w-10 rounded-full">
								<img
									src={text.sender == 'Sananshi Pidyar'
										? 'https://pps.whatsapp.net/v/t61.24694-24/146671092_640994244434955_6606309732909724688_n.jpg?ccb=11-4&oh=01_AdR6pMOe9PffO4sJXDR5pIc-LeWBLmGO2zJPcZkW3adDlA&oe=648B2AAC'
										: 'https://pps.whatsapp.net/v/t61.24694-24/319948242_206350655299624_4193892322770336898_n.jpg?ccb=11-4&oh=01_AdRxMNr96OtwCLf6aFpW3mBtOVMeV3pT4V7NFS3OCyE6Kg&oe=648BA891'}
									alt="img"
								/>
							</div>
						</div>
						<div class="chat-header">
							{text.sender}
						</div>
						<div class="chat-bubble bg-base-100 text-left">{text.content}</div>
						<div class="chat-footer opacity-50">
							{new Date(parseDateTimeString(text.time)).toLocaleString()}
						</div>
					</div>
				</div>
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
</div>
