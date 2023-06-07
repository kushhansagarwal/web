<script lang="ts">
	import { json } from '@sveltejs/kit';
	import { text } from './stores';

	async function getTexts() {
		// const res = await fetch('http://127.0.0.1:5000/query', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		collection_name: 'Text',
		// 		query: $text
		// 	})
		// });

		const res = await fetch('/api/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat: "IM",
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
		image: string;
		chat: string;
		_additional: string;
	}
	var texts: Text[] = [];
</script>

<div class="p-5">
	<div class="navbar bg-base-200 sticky top-0 z-50">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl">a trip down memory lane</a>
		</div>
		<div class="flex-none gap-2">
			<div class="form-control">
				<input
					bind:value={$text}
					type="text"
					placeholder="Search"
					class="input input-bordered w-24 md:w-auto"
				/>
			</div>
			<button class="btn btn-square">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					on:click={async () => {
						promise = getTexts();
					}}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</button>
		</div>
	</div>
    <div class="divider"></div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#await promise}
			<div class="bg-base-300 p-5 rounded-xl m-2 text-center h-28 animate-pulse" />
			<div class="bg-base-300 p-5 rounded-xl m-2 text-center h-28 animate-pulse" />
			<div class="bg-base-300 p-5 rounded-xl m-2 text-center h-28 animate-pulse" />
		{:then texts}
			{#each texts as text}
				<div class="bg-base-300 p-5 rounded-xl m-2 text-center">
					<div class="chat chat-start">
						<div class="chat-image avatar">
							<div class="w-10 rounded-full">
								<img
									src={text.image}
									alt="img"
								/>
							</div>
						</div>
						<div class="chat-header">
							{text.sender}
						</div>
						<div class="chat-bubble bg-base-100 text-left">{text.content}</div>
						<div class="chat-footer opacity-50">
							{text.time}
						</div>
					</div>
				</div>
			{/each}
		{:catch error}
			<div class="hero min-h-screen bg-base-300  col-span-3 w-96">
				<div class="hero-content text-center" />
			</div>
			<!-- <div class="toast animate-pulse">
            <div class="alert alert-error">
              <span>Internal server error</span>
            </div>
          </div> -->
		{/await}
	</div>
</div>
