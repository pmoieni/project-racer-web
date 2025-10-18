<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Model from './Model.svelte';
	import { onMount } from 'svelte';

	let model: ReturnType<typeof Model>;

	onMount(() => {
		const triggers = document.querySelectorAll('#anim-trigger');
		const observer = new IntersectionObserver(
			(events) => {
				events.forEach(async (event) => {
					if (model) {
						if (event.isIntersecting) {
							if (event.boundingClientRect.top < 0) {
								model.animateReverse();
								return;
							}

							model.animate();
						}
					}
				});
			},
			{ threshold: 0.8 }
		);
		triggers.forEach((t) => {
			if (t) observer.observe(t);
		});
	});
</script>

<main>
	<section class="relative p-10">
		<div class="h-full">background video</div>
		<h1 class="absolute top-0 left-0 heading">Lights out.<br />Race on!</h1>
	</section>
	<section id="anim-trigger" class="bg-amber-100">
		<h2 class="heading">Authentic Physics</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
			nisi, sunt et eaque, id nostrum alias dolorum. Illum autem maiores amet aperiam delectus
			blanditiis dolores molestiae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
			numquam recusandae, tenetur odio nisi, sunt et eaque, id nostrum alias dolorum. Illum autem
			maiores amet aperiam delectus blanditiis dolores molestiae. Lorem ipsum dolor sit, amet
			consectetur adipisicing elit. A numquam recusandae, tenetur odio nisi, sunt et eaque, id
			nostrum alias dolorum. Illum autem maiores amet aperiam delectus blanditiis dolores molestiae.
		</p>
	</section>
	<section>
		<h2 class="heading">Variety of Cars</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
			nisi, sunt et eaque, id nostrum alias dolorum. Illum autem maiores amet aperiam delectus
			blanditiis dolores molestiae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
			numquam recusandae, tenetur odio nisi, sunt et eaque, id nostrum alias dolorum. Illum autem
			maiores amet aperiam delectus blanditiis dolores molestiae. Lorem ipsum dolor sit, amet
			consectetur adipisicing elit. A numquam recusandae, tenetur odio nisi, sunt et eaque, id
			nostrum alias dolorum. Illum autem maiores amet aperiam delectus blanditiis dolores molestiae.
		</p>
	</section>
	<section id="anim-trigger" class="bg-amber-100">
		<h2 class="heading">Licensed tracks</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
			nisi, sunt et eaque, id nostrum alias dolorum. Illum autem maiores amet aperiam delectus
			blanditiis dolores molestiae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
			numquam recusandae, tenetur odio nisi, sunt et eaque, id nostrum alias dolorum. Illum autem
			maiores amet aperiam delectus blanditiis dolores molestiae. Lorem ipsum dolor sit, amet
			consectetur adipisicing elit. A numquam recusandae, tenetur odio nisi, sunt et eaque, id
			nostrum alias dolorum. Illum autem maiores amet aperiam delectus blanditiis dolores molestiae.
		</p>
	</section>
	<section>
		<h2 class="heading">Ranked multiplayer</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
			nisi, sunt et eaque, id nostrum alias dolorum. Illum autem maiores amet aperiam delectus
			blanditiis dolores molestiae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
			numquam recusandae, tenetur odio nisi, sunt et eaque, id nostrum alias dolorum. Illum autem
			maiores amet aperiam delectus blanditiis dolores molestiae. Lorem ipsum dolor sit, amet
			consectetur adipisicing elit. A numquam recusandae, tenetur odio nisi, sunt et eaque, id
			nostrum alias dolorum. Illum autem maiores amet aperiam delectus blanditiis dolores molestiae.
		</p>
	</section>
</main>
<footer id="footer">CONTACT INFO</footer>

<div class="canvas">
	<Canvas>
		<Model bind:this={model} />
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
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
