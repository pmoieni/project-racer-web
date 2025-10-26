<script lang="ts">
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import gsap from 'gsap';
	import { Observer } from 'gsap/all';
	import { onMount } from 'svelte';

	gsap.registerPlugin(Observer);

	let displayMenu = false;

	function menuBtnOnClick() {
		if (displayMenu) {
			displayMenu = false;
			return;
		}

		displayMenu = true;

		let navItems = gsap.utils.toArray('.menu-list-con > ul > li');

		navItems.forEach((item, index) => {
			if (item)
				gsap.fromTo(
					item,
					{ opacity: 0, y: 100 },
					{ opacity: 1, y: 0, duration: 1, delay: index * 0.2, ease: 'power4.out' }
				);
		});
	}

	onMount(() => {
		Observer.create({});
	});
</script>

<nav class="fixed z-20 flex w-full flex-nowrap items-center justify-between p-5">
	<div class="logo">LOGO</div>
	<div class="menu">
		<button
			on:click={menuBtnOnClick}
			class=" rounded-full border-none bg-base-content p-2 pl-4 outline-none"
		>
			<div class="flex h-full w-full flex-nowrap items-center justify-between space-x-4">
				<p>{displayMenu ? 'Close' : 'Menu'}</p>
				<span class="rounded-4xl bg-base-300 p-2"><MenuIcon /></span>
			</div>
		</button>
	</div>
</nav>
<div
	class={`menu-con fixed top-0 z-10 ${displayMenu ? 'left-0' : '-left-full'}  h-full w-full bg-base-300 transition-[left]`}
>
	<div class="menu-list-con flex h-full w-full items-center justify-center">
		<ul>
			<li>
				<a
					href=""
					class="text-6xl font-bold tracking-wide text-base-content/50 transition-[color] hover:text-base-content"
					>Home</a
				>
			</li>
			<li>
				<a
					href=""
					class="text-6xl font-bold tracking-wide text-base-content/50 transition-[color] hover:text-base-content"
					>Rankings</a
				>
			</li>
			<li>
				<a
					href=""
					class="text-6xl font-bold tracking-wide text-base-content/50 transition-[color] hover:text-base-content"
					>About</a
				>
			</li>
			<li>
				<a
					href=""
					class="text-6xl font-bold tracking-wide text-base-content/50 transition-[color] hover:text-base-content"
					>Contact</a
				>
			</li>
		</ul>
	</div>
</div>
<slot />
