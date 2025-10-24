<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Model from './components/Model.svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { ScrollTrigger } from 'gsap/all';

	gsap.registerPlugin(ScrollTrigger);

	let modelState = $state({
		camFOV: 20,
		camPosX: 0,
		camPosY: 0,
		camPosZ: 6,
		dirLightPosX: -10,
		dirLightPosY: 10,
		dirLightPosZ: -5,
		dirLightIntensity: 0,
		dirLightColor: '#ffffff',
		dirLight2PosX: 5,
		dirLight2PosY: 5,
		dirLight2PosZ: -5,
		dirLight2Intensity: 0,
		dirLight2Color: '#eb5b00',
		rotationX: 0,
		rotationY: 0,
		rotationZ: 0
	});

	onMount(() => {
		// initial animation

		gsap
			.timeline()
			.to(modelState, {
				duration: 1.5,
				ease: 'power4',
				camPosY: 1,
				camPosZ: 12,
				dirLightIntensity: 5,
				dirLight2Intensity: 5
			})
			.to(modelState, {
				duration: 1.5,
				ease: 'power4',
				camFOV: 24,
				camPosX: -4,
				camPosY: 1.5,
				camPosZ: 12,
				rotationY: -Math.PI / 4
			})
			.to(
				modelState,
				{
					duration: 1.5,
					ease: 'power4',
					dirLightPosX: -3,
					dirLightPosY: 3,
					dirLightPosZ: 5
				},
				'-=1'
			);
		/*
			.to(
				'.heading-con',
				{
					duration: 1,
					ease: 'power4',
					translateY: '0',
					opacity: 1
				},
				'<'
			)
			.to(
				'.download-con',
				{
					duration: 1,
					delay: 0.5,
					ease: 'power4',
					translateY: '0',
					opacity: 1
				},
				'<'
			);
			*/

		ScrollTrigger.create({
			trigger: '.scroll_trigger_1',
			start: 'top top',
			pin: true,
			onEnter: () => {
				gsap.to(modelState, { camPosX: 0, rotationY: -Math.PI / 2, camFOV: 35 });
			},
			onLeaveBack: () => {
				gsap.to(modelState, { camPosX: -4, rotationY: -Math.PI / 4, camFOV: 24 });
			}
		});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: '.scroll_trigger_2',
					pin: true,
					scrub: 2
				}
			})
			.to('.second_car', { top: 0 })
			.to('.third_car', { top: 0 });

		ScrollTrigger.create({
			trigger: '.footer',
			onEnter: () => {
				gsap.to(modelState, {
					duration: 1.5,
					ease: 'power4',
					rotationY: -Math.PI,
					camPosX: 0,
					camFOV: 25,
					dirLightIntensity: 2,
					dirLightPosX: 0,
					dirLightPosY: 5,
					dirLightPosZ: 5,
					dirLight2Intensity: 0
				});
			},
			onLeaveBack: () => {
				gsap.to(modelState, {
					duration: 1.5,
					ease: 'power4',
					rotationY: -Math.PI / 2,
					camPosX: 0,
					camFOV: 35,
					dirLightIntensity: 5,
					dirLightPosX: -3,
					dirLightPosY: 3,
					dirLightPosZ: 5,
					dirLight2Intensity: 5
				});
			}
		});
	});
</script>

<main class="w-full">
	<section class="flex flex-col px-5 py-10 md:p-20">
		<div class="heading-con flex h-full w-full flex-col items-center leading-none md:items-start">
			<h3 class="text-left text-primary">Realistic Sim</h3>
			<br />
			<h1 class="text-center font-bold text-primary">In Your Pocket!</h1>
		</div>
		<div
			class="download-con flex h-full w-full flex-col items-center justify-center md:items-start"
		>
			<p class="pb-4 font-bold text-base-content uppercase">download now</p>
			<div
				class="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
			>
				<a><img class="h-auto w-56" src="/gplay_banner.png" /></a>
				<a><img class="h-auto w-56" src="/appstore_banner.png" /></a>
			</div>
		</div>
	</section>
	<section class="m:py-5 m:px-10">
		<div
			class="physics-section-con flex h-full w-full flex-col items-start justify-end bg-cover bg-center bg-no-repeat p-10 md:rounded-4xl"
			style="background-image: url('/images/V29F_1.webp');"
		>
			<h2 class="font-bold text-primary">Authentic Physics</h2>
			<p class="max-w-2xl indent-8 text-primary-content">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
				nisi, sunt et eaque, id nostrum alias dolorum.
			</p>
		</div>
	</section>
	<section class="scroll_trigger_1 relative">
		<h1 class="text-center font-bold text-primary">Variety of Cars</h1>
	</section>
	<section class="scroll_trigger_2 relative">
		<div
			class="first_car absolute top-0 left-0 h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat"
			style="background-image: url('/images/NM1_garage.webp');"
		>
			<div
				class="flex h-full w-full flex-col items-start justify-end bg-linear-to-t from-base-300 to-transparent p-10 text-base-content"
			>
				<h3>NM1</h3>
			</div>
		</div>
		<div
			class="second_car absolute top-full left-0 h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat"
			style="background-image: url('/images/MD10_garage.webp');"
		>
			<div
				class="flex h-full w-full flex-col items-start justify-end bg-linear-to-t from-base-300 to-transparent p-10 text-base-content"
			>
				<h3>MD10</h3>
			</div>
		</div>
		<div
			class="third_car absolute top-full left-0 h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat"
			style="background-image: url('/images/V29F_garage.webp');"
		>
			<div
				class="flex h-full w-full flex-col items-start justify-end bg-linear-to-t from-base-300 to-transparent p-10 text-base-content"
			>
				<h3>V29F</h3>
			</div>
		</div>
	</section>
	<section
		class="bg-cover bg-fixed bg-center bg-no-repeat"
		style="background-image: url('/images/clark.jpg');"
	>
		<div
			class="flex h-full w-full flex-col items-start justify-end bg-linear-to-t from-base-300 to-transparent p-10"
		>
			<h1 class="font-bold text-primary">Licensed tracks</h1>
			<p class="text-base-content">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
				nisi, sunt et eaque, id nostrum alias dolorum.
			</p>
		</div>
	</section>
	<section class="footer h-full w-full"><h1 class="text-base-content">FOOTER</h1></section>
</main>

<div class="canvas">
	<Canvas dpr={1.5}>
		<Model
			camFOV={modelState.camFOV}
			camPosX={modelState.camPosX}
			camPosY={modelState.camPosY}
			camPosZ={modelState.camPosZ}
			dirLightPosX={modelState.dirLightPosX}
			dirLightPosY={modelState.dirLightPosY}
			dirLightPosZ={modelState.dirLightPosZ}
			dirLightIntensity={modelState.dirLightIntensity}
			dirLightColor={modelState.dirLightColor}
			dirLight2PosX={modelState.dirLight2PosX}
			dirLight2PosY={modelState.dirLight2PosY}
			dirLight2PosZ={modelState.dirLight2PosZ}
			dirLight2Intensity={modelState.dirLight2Intensity}
			dirLight2Color={modelState.dirLight2Color}
			rotationX={modelState.rotationX}
			rotationY={modelState.rotationY}
			rotationZ={modelState.rotationZ}
		/>
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
