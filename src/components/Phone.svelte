<script lang="ts">
	import ChatBubble from './ChatBubble.svelte';
	import ContextBubble from './ContextBubble.svelte';
	export let data: Text[];

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
</script>

<div class="mockup-phone">
	<div class="camera" />
	<div class="display">
		<div class="artboard artboard-demo phone-1">
			<div class="overflow-scroll pt-10">
				{#each data as textMessage}
					<div class="bg-base-300 p-2 rounded-xl m-2 text-center">
						<ContextBubble data={textMessage} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
