<script lang="ts">
	import { page } from '$app/stores';
	import NavItem from './components/NavItem.svelte';

	let menuIsOpen = false;
</script>

<div class="relative">
	<span class="w-20 h-8">
		<button
			type="button"
			class={`border rounded-md w-full h-full px-2 md:px-4 transition ${
				menuIsOpen ? ' bg-red-500 hover:bg-red-400 rounded-b-none border-b-0' : 'hover:bg-gray-400'
			}`}
			on:click={() => {
				menuIsOpen = !menuIsOpen;
			}}>{menuIsOpen ? 'X' : 'Menu'}</button
		>
	</span>
	{#if menuIsOpen}
		<div
			class="nav-border space-y-2 absolute w-64 h-96 md:h-fit bg-slate-800 top-8 -left-44 md:left-0 rounded-md rounded-tr-none md:rounded-tr-md md:rounded-tl-none shadow-lg box-border z-10 p-2 overflow-y-auto overflow-x-hidden"
		>
			<div class="w-full flex border-b-2 pb-2 px-2">
				<div class="ml-auto w-2/3">
					{#if $page.data.session?.user && Object.keys($page.data.session.user || {}).length}
						<p class="text-right">
							{$page.data.session.user.name}
						</p>
						<p class="text-right break-words text-xs">
							{$page.data.session.user.email}
						</p>
						<span class="sign-out w-full text-right mt-2">
							<a href="/auth/signout" data-sveltekit-preload-data="off">Sign out</a>
						</span>
					{:else}
						<span class="mt-auto sign-in w-full text-right">
							<a href="/auth/signin" data-sveltekit-preload-data="off">Sign in</a>
						</span>
					{/if}
				</div>
			</div>
			<div class="flex flex-wrap items-center justify-evenly gap-1.5 w-full mb-4">
				<NavItem text="Home" link="/" />
				<NavItem text="Campaigns" link="/campaigns" />
				<NavItem text="Characters" link="/characters" />
				<NavItem text="NPCs" link="/npcs" />
				<NavItem text="Monsters" link="/monsters" />
				<NavItem text="Places" link="/places" />
				<NavItem text="Groups" link="/organizations" />
				<NavItem text="Quests" link="/quests" />
				<NavItem text="Deities" link="/deities" />
				<NavItem text="Monsters" link="/monsters" />
				<!-- <NavItem text="Combat" link="/combat" /> -->
				<NavItem text="Sessions" link="/sessions" />
				<NavItem text="Settings" link="/settings" />
			</div>
		</div>
	{/if}
</div>

<style>
	.nav-border {
		border: 1px solid #d0d0d0;
	}

	.sign-in {
		@apply text-green-400;
	}
	.sign-in a {
		@apply text-green-300;
	}
	.sign-in a:hover,
	.sign-in a:focus {
		@apply text-green-200;
	}
	.sign-out {
		@apply text-red-400;
	}
	.sign-out a {
		@apply text-red-300;
	}
	.sign-out a:hover,
	.sign-out a:focus {
		@apply text-red-200;
	}
</style>
