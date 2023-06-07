<script lang="ts">
    import type { Text } from "svelte/types/compiler/interfaces";
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
						<div class="chat-header">
							{data.sender}
							<time class="ml-1 text-xs opacity-50">{data._additional.certainty.toFixed(2)}</time>
						</div>
						<div class="chat-bubble bg-base-100 text-left">{data.content}</div>
						<div class="chat-footer opacity-50">
							{new Date(parseInt(data.time)).toLocaleDateString('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
					</div>

