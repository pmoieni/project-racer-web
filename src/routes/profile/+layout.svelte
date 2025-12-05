<script>
	import UserIcon from '$lib/components/icons/UserIcon.svelte';
</script>

<main class="flex h-full w-full flex-col">
	<nav class="z-20 flex w-full flex-nowrap items-center justify-between px-4 pt-4">
		<div class="logo">LOGO</div>
		<div class="flex items-center justify-center space-x-4">
			<a href="/profile" class="rounded-full bg-base-content p-2"><UserIcon /></a>
		</div>
	</nav>
	<div class="flex h-full w-full space-x-4 p-4">
		<slot />
	</div>
</main>
