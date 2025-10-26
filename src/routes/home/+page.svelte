<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Model from './components/Model.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/all';
	import Lenis from 'lenis';

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
		const lenis = new Lenis();

		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		// intro animation
		const carAnim = gsap
			.timeline({ paused: true })
			.add('initial')
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
			)
			.fromTo(
				'.banner',
				{
					y: 10,
					opacity: 0
				},
				{
					duration: 1,
					ease: 'power4',
					y: 2,
					opacity: 1
				},
				'<'
			)
			.fromTo(
				'.downloads',
				{
					y: 10,
					opacity: 0
				},
				{
					duration: 1,
					delay: 0.5,
					ease: 'power4',
					y: 0,
					opacity: 1
				},
				'<'
			)
			.pause()
			.add('display')
			.to(modelState, {
				camPosX: 0,
				rotationY: -Math.PI / 2,
				camFOV: 35
			})
			.add('footer')
			.to(modelState, {
				rotationY: -Math.PI,
				camPosX: 0,
				camFOV: 25,
				dirLightIntensity: 2,
				dirLightPosX: 0,
				dirLightPosY: 5,
				dirLightPosZ: 5,
				dirLight2Intensity: 0
			})
			.add('end');

		carAnim.tweenFromTo('initial', 'display');

		ScrollTrigger.create({
			trigger: '.car-display',
			start: 'top top',
			pin: true,
			animation: carAnim.tweenFromTo('display', 'footer'),
			scrub: 2
		});

		ScrollTrigger.create({
			trigger: '.footer',
			pin: true,
			animation: carAnim.tweenFromTo('footer', 'end'),
			scrub: 2
		});

		const carsCon = document.querySelector('.cars-con');

		const getScrollWidth = () => {
			if (carsCon) {
				const carsSectionWidth = carsCon.scrollWidth;
				return -(carsSectionWidth - window.innerWidth);
			}

			return 0;
		};

		const carsSectionTween = gsap.to(carsCon, {
			x: getScrollWidth
		});

		ScrollTrigger.create({
			trigger: '.cars',
			start: 'top top',
			end: () => `+=${getScrollWidth() * -1}`,
			pin: true,
			scrub: true,
			animation: carsSectionTween,
			invalidateOnRefresh: true
		});
	});
</script>

<main id="main" class="h-screen w-full">
	<section class="hero flex h-full w-full flex-col items-center justify-around p-10 md:items-start">
		<div class="banner">
			<h3 class="leading-none text-primary">Realistic Sim</h3>
			<h1 class="leading-none font-bold text-primary">In Your Pocket!</h1>
		</div>
		<div class="downloads space-y-4">
			<p class="text-lg font-bold text-base-content">Download Now on</p>
			<div
				class="links md: flex flex-col items-center space-y-4 space-x-4 md:flex-row md:space-y-0"
			>
				<a href=""><img class="h-auto w-56" src="/gplay_banner.webp" /></a>
				<a href=""><img class="h-auto w-56" src="/appstore_banner.webp" /></a>
			</div>
		</div>
	</section>
	<section
		style="background-image: url('/images/V29F_1.webp');"
		class="physics flex h-full w-full flex-col items-start justify-end bg-cover bg-fixed bg-center bg-no-repeat p-10"
	>
		<h2 class="font-bold text-primary">Authentic Physics</h2>
		<p class="max-w-2xl indent-8 text-primary-content">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
			nisi, sunt et eaque, id nostrum alias dolorum.
		</p>
	</section>
	<section class="car-display relative h-full w-full">
		<h2 class="absolute top-1/2 left-1/2 -translate-1/2 font-bold text-nowrap text-primary">
			Variety of Cars
		</h2>
	</section>
	<section class="cars h-full w-full overflow-hidden">
		<div class="cars-con flex h-full w-full">
			<div
				class="h-full w-full shrink-0 bg-cover bg-center bg-no-repeat"
				style="background-image: url('/images/NM1_garage.webp');"
			>
				<div
					class="flex h-full w-full items-center justify-center bg-linear-to-t from-base-300 to-transparent p-10 text-base-content"
				>
					<h3 class="font-bold">NM1</h3>
				</div>
			</div>
			<div
				class="h-full w-full shrink-0 bg-cover bg-center bg-no-repeat"
				style="background-image: url('/images/MD10_garage.webp');"
			>
				<div
					class="flex h-full w-full items-center justify-center bg-linear-to-t from-base-300 to-transparent p-10 text-base-content"
				>
					<h3 class="font-bold">MD10</h3>
				</div>
			</div>
			<div
				class="h-full w-full shrink-0 bg-cover bg-center bg-no-repeat"
				style="background-image: url('/images/V29F_garage.webp');"
			>
				<div
					class="flex h-full w-full flex-col items-center justify-center bg-linear-to-t from-base-300 to-transparent p-10 text-base-content"
				>
					<h3 class="font-bold">V29F</h3>
				</div>
			</div>
		</div>
	</section>
	<section
		class="tracks h-full w-full bg-cover bg-fixed bg-center"
		style="background-image: url('/images/clark.jpg');"
	>
		<div
			class="flex h-full w-full flex-col items-start justify-end bg-linear-to-t from-base-300 to-transparent p-10"
		>
			<h1 class="font-bold text-primary">Licensed Tracks</h1>
			<p class="text-base-content">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. A numquam recusandae, tenetur odio
				nisi, sunt et eaque, id nostrum alias dolorum.
			</p>
		</div>
	</section>
	<section class="footer flex h-full w-full items-center justify-center text-base-content">
		<h1>FOOTER</h1>
	</section>
</main>

<div class="fixed top-0 left-0 z-[-1] h-full w-full">
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
