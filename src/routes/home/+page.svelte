<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Model from './components/Model.svelte';
</script>

<main>
	<section class="relative h-dvh w-full p-10">
		<div class="h-full">background video</div>
		<h1 class="absolute top-0 left-0 heading">Lights out.<br />Race on!</h1>
	</section>
	<section>
		<h2 class="heading">Authentic Physics</h2>
	</section>
	<section>
		<h2 class="heading">Variety of Cars</h2>
	</section>
	<section>
		<h2 class="heading">Licensed tracks</h2>
	</section>
	<section>
		<h2 class="heading">Ranked multiplayer</h2>
	</section>
	<section></section>
</main>

<div class="canvas">
	<Canvas>
		<Model />
	</Canvas>
</div>

<style>
	.canvas {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	section {
		width: 100vw;
		height: 100vh;
	}
</style>
