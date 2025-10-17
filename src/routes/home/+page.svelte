<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Model, { AnimController, type AnimConfig, type AnimNode } from './Model.svelte';
	import { onMount } from 'svelte';

	const steps: AnimConfig[] = [
		// lights on
		{
			dirLight: {
				position: { x: 0, y: 10, z: -10 },
				intensity: 0
			},
			camera: {
				fov: 20,
				position: { x: 0, y: 1, z: 12 },
				lookAt: { x: 0, y: 1, z: 0 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 2000,
			isStoppable: false
		},
		// lights stay on
		{
			dirLight: {
				position: { x: 0, y: 10, z: -10 },
				intensity: 1
			},
			camera: {
				fov: 20,
				position: { x: 0, y: 1, z: 12 },
				lookAt: { x: 0, y: 1, z: 0 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 2000,
			isStoppable: true
		},
		// lights off
		{
			dirLight: {
				position: { x: 0, y: 10, z: -10 },
				intensity: 0
			},
			camera: {
				fov: 20,
				position: { x: 0, y: 1, z: 12 }
				// lookAt: { x: 2, y: 0, z: 0 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 1500,
			isStoppable: false
		},
		// rotate slightly towards headlights with increased fov
		{
			dirLight: {
				position: { x: -10, y: 5, z: 3 },
				intensity: 0
			},
			camera: {
				fov: 20,
				position: { x: 4, y: 1, z: 10 },
				lookAt: { x: -2, y: 1, z: 2 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 500,
			isStoppable: false
		},
		// lights on and rotate towards headlights
		{
			dirLight: {
				position: { x: 10, y: 10, z: 3 },
				intensity: 5
			},
			camera: {
				fov: 20,
				position: { x: 5, y: 1, z: 10 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 2500,
			isStoppable: true
		},
		// rotate more while turning the lights off
		{
			dirLight: {
				position: { x: -10, y: 5, z: 3 },
				intensity: 0
			},
			camera: {
				fov: 20,
				position: { x: 5, y: 1, z: 8 },
				lookAt: { x: 5, y: 1, z: 10 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 1500,
			isStoppable: false
		},
		// move towards rear lights
		{
			dirLight: {
				position: { x: 5, y: 10, z: 3 },
				intensity: 8
			},
			camera: {
				fov: 20,
				position: { x: 0, y: 1.5, z: -12 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 4000,
			isStoppable: true
		},
		// slowly turn lights off
		{
			dirLight: {
				position: { x: 0, y: 5, z: 5 },
				intensity: 0
			},
			camera: {
				fov: 15,
				position: { x: 0, y: 1.5, z: -12 },
				lookAt: { x: 0, y: 1, z: 0 }
			},
			model: {
				rotation: { x: 0, y: 0, z: 0 }
			},
			duration: 2500,
			isStoppable: false
		}
	];

	onMount(() => {
		const animController = new AnimController();
		steps.forEach((step) => animController.insertNode(step));
		let stoppedAt: AnimNode | null = null;

		const triggers = document.querySelectorAll('#anim-trigger');
		const observer = new IntersectionObserver(
			(events) => {
				events.forEach(async (event) => {
					if (event.isIntersecting) {
						if (event.boundingClientRect.top < 0) {
							stoppedAt = await animController.animate(stoppedAt, true);
							return;
						}

						stoppedAt = await animController.animate(stoppedAt, true);
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
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
