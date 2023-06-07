<script lang="ts">
	import ChatBubble from '../components/ChatBubble.svelte';

	import { json } from '@sveltejs/kit';
	import { text } from './stores';
	import Phone from '../components/Phone.svelte';

	let showPhone = false;

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
				chat: 'IM',
				query: $text
			})
		});

		textsToShow = await res.json();

		if (res.ok) {
			return textsToShow;
		} else {
			throw new Error(res.statusText);
		}
	}

	async function getContext(time: String, chat: String) {
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

		const res = await fetch('/api/context', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				time: time,
				chat: chat
			})
		});

		textsToShow = await res.json();

		if (res.ok) {
			showPhone = true;
			return textsToShow;
		} else {
			throw new Error(res.statusText);
		}
	}

	let searchPromise: Promise<Text[]> = Promise.resolve([]);
	let contextPromise: Promise<Text[]> = Promise.resolve([]);

	function search() {
		searchPromise = getTexts();
	}

	function showContext(time: String, chat: String) {
		contextPromise = getContext(time, chat);
	}

	interface Text {
		time: string;
		sender: string;
		content: string;
		image: string;
		chat: string;
		_additional: {
			certainty: number;
		};
	}
	var textsToShow: Text[] = [];
</script>

<div class="p-5">
	<div class="navbar bg-base-200 sticky top-0 z-50">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl">a trip down memory lane.</a>
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
						search();
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
	<div class="divider" />
	{#if showPhone}
		{#await contextPromise}
			<!-- <Phone class="animate-pulse"></Phone> -->
			Loading...
		{:then texts}
			<Phone data={texts} />
		{/await}
	{/if}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#await searchPromise}
			<div class="bg-base-300 p-5 rounded-xl m-2 text-center h-28 animate-pulse" />
			<div class="bg-base-300 p-5 rounded-xl m-2 text-center h-28 animate-pulse" />
			<div class="bg-base-300 p-5 rounded-xl m-2 text-center h-28 animate-pulse" />
		{:then texts}
			{#each texts as textMessage}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="bg-base-300 p-5 rounded-xl m-2 text-center"
					on:click={async () => {
						showContext(textMessage.time, textMessage.chat);
					}}
				>
					<ChatBubble data={textMessage} />
				</div>
			{/each}
		{:catch error}
			<div class="toast animate-pulse">
				<div class="alert alert-error">
					<span>Enter a search term!</span>
				</div>
			</div>
		{/await}
	</div>
</div>
