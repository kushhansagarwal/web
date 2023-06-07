<script lang="ts">
	import type { Text } from 'svelte/types/compiler/interfaces';
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

	export let data: Text;
</script>

<div class="chat chat-start">
	<div class="chat-image avatar">
		<div class="w-10 rounded-full">
			<img src={data.image} alt="img" />
		</div>
	</div>
	<div class="chat-header text-xs pd-4">
		{data.sender}
		<!-- <time class="ml-1 text-xs opacity-50">{data._additional.certainty.toFixed(2) ?? 0}</time> -->
	</div>
	<div class="chat-bubble bg-base-100 text-left text-sm">{data.content}</div>
</div>
