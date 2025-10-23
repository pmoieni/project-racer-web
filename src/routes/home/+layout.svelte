<script lang="ts">
	import AboutIcon from '$lib/icons/AboutIcon.svelte';
	import ContactIcon from '$lib/icons/ContactIcon.svelte';
	import CupIcon from '$lib/icons/CupIcon.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';

	const navConDetachedClass = 'bg-base-100/75 backdrop-blur-sm';
	const navDetachedStyle = 'padding: 1rem;';
	let detached = false;

	function onScroll() {
		if (window.scrollY > 0) {
			detached = true;
			return;
		}

		detached = false;
	}

	let showMobileNav = window.innerWidth < 768;
	function onResize() {
		if (window.innerWidth < 768) {
			showMobileNav = true;
			return;
		}

		showMobileNav = false;
	}
</script>

<svelte:window on:resize={onResize} on:scroll={onScroll} />

{#if showMobileNav}
	<nav>DAMN BRUH</nav>
{:else}
	<nav
		class="sticky top-0 left-0 z-10 w-full transition-[padding]"
		style={detached ? navDetachedStyle : ''}
	>
		<div
			class={`nav-con flex w-full items-center justify-between rounded-4xl px-5 ${detached ? navConDetachedClass : ''}`}
		>
			<div class="logo">Logo</div>
			<div
				class="links fixed top-0 left-0 flex h-full w-full items-center justify-center bg-base-300 md:static md:h-auto md:bg-transparent"
			>
				<ul
					class="flex h-full w-full list-none flex-col items-center justify-center space-y-12 text-4xl text-base-content md:h-auto md:w-auto md:flex-row md:space-y-0 md:space-x-8 md:text-base"
				>
					<li>
						<a class="flex items-center space-x-2">
							<CupIcon />
							<p>Rankings</p>
						</a>
					</li>
					<li>
						<a class="flex items-center space-x-2">
							<ContactIcon />
							<p>Contact us</p>
						</a>
					</li>
					<li>
						<a class="flex items-center space-x-2">
							<AboutIcon />
							<p>About us</p>
						</a>
					</li>
				</ul>
			</div>
			<div class="user">User</div>
			<button class="menu-btn flex items-center space-x-2 text-sm text-base-content md:hidden">
				<p>menu</p>
				<MenuIcon />
			</button>
		</div>
	</nav>
{/if}
<slot />

<style>
	nav {
		.logo,
		.user {
			margin: 1rem;
		}
	}
</style>
