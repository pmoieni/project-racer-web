<script lang="ts">
	import { onMount } from 'svelte';

	let ws: WebSocket | null = null;

	const sendMsg = () => {
		if (ws) ws.send('test message');
	};

	onMount(() => {
		ws = new WebSocket('ws://localhost:1234/v1/telemetry/ws');

		ws.addEventListener('open', (event) => {
			console.log('WS connection established: ', event);
		});
		ws.addEventListener('close', (event) => {
			console.log('WS connection closed: ', event);
		});
		ws.addEventListener('error', (event) => {
			console.log('WS connection err: ', event);
		});
		ws.addEventListener('message', (event: MessageEvent) => {
			console.log('WS connection message: ', event.data);
		});
	});
</script>

<div class="h-full w-96 font-display">
	<div class="flex w-full flex-col space-y-4 rounded-4xl bg-base-100 p-4">
		<div class="flex flex-col items-center">
			<img class="mb-2 size-28 rounded-full" src="/images/clark.jpg" alt="" />
			<p class="text-2xl font-bold tracking-wide text-primary">John Doe</p>
			<p class="text-base font-bold text-base-content/50">Level 10 | Champion</p>
		</div>
		<div class="space-y-4">
			<div class="space-y-2">
				<p class="font-bold text-base-content">most driven car</p>
				<div
					class="h-40 w-full rounded-4xl bg-cover bg-center"
					style="background-image: url('/images/NM1_1.webp');"
				>
					<div
						class="flex h-full w-full items-center justify-center rounded-tr-4xl rounded-br-4xl rounded-bl-4xl bg-base-300/50"
					>
						<p class="font-bold text-base-content">NM1</p>
					</div>
				</div>
			</div>
			<div class="space-y-2">
				<p class="font-bold text-base-content">most driven track</p>
				<div
					class="h-40 w-full overflow-hidden rounded-tr-4xl rounded-br-4xl rounded-bl-4xl bg-cover bg-center"
					style="background-image: url('/images/clark.jpg');"
				>
					<div class="flex h-full w-full items-center justify-center bg-base-300/50">
						<p class="font-bold text-base-content">Clark International Speedway</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="content-con h-full w-full">
	<div class="h-full w-full rounded-4xl bg-base-100">
		<button class="bg-base-content p-5 text-base-300" on:click={sendMsg}>Send Message</button>
	</div>
</div>
