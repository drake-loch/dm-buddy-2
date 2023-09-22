<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-wrap gap-2 px-2 md:p-0 w-full md:flex-nowrap md:flex-col flex-grow">
	<span class="nav-link">
		<a href="/"> Home </a>
	</span>
	<span class="nav-link">
		<a href="/npcs">NPCs</a>
	</span>
	<span class="nav-link">
		<a href="/characters">Characters</a>
	</span>
	<span class="nav-link">
		<a href="/places">Places</a>
	</span>
	<span class="nav-link">
		<a href="/campaigns">Campaigns</a>
	</span>
	<span class="nav-link">
		<a href="/organizations">Organizations</a>
	</span>
	<span class="nav-link">
		<a href="/battle">Battles</a>
	</span>
	<span class="nav-link">
		<a href="/settings">Settings</a>
	</span>
	{#if $page.data.session?.user && Object.keys($page.data.session.user || {}).length}
		<p class="mt-auto">
			Logged in as {$page.data.session.user.name}
		</p>
		<span class="sign-out">
			<a href="/auth/signout" data-sveltekit-preload-data="off">Sign out</a>
		</span>
	{:else}
		<span class="mt-auto sign-in">
			<a href="/auth/signin" data-sveltekit-preload-data="off">Sign in</a>
		</span>
	{/if}
</div>

<style>
	span,
	p {
		@apply px-1;
	}
	a {
		text-decoration: none;
	}
	a:focus {
		@apply outline-none;
	}
	.nav-link {
		@apply text-blue-400 underline;
	}
	.nav-link a {
		@apply text-blue-300;
	}
	.nav-link a:hover,
	.nav-link a:focus {
		@apply text-blue-200;
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
