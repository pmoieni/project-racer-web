<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { Snippet } from 'svelte';
	import { Canvas } from '@threlte/core';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="canvas">
	<Canvas></Canvas>
</div>

<nav class="fixed">nav</nav>

{@render children?.()}

<style>
	.canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: block;
		z-index: -1;
	}
</style>
