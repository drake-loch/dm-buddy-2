<script lang="ts">
	import { goto } from '$app/navigation';
	import NavMenu from '../../nav/NavMenu.svelte';

	export let windowTitle = 'DM Buddy';
	export let backNav: string | undefined = undefined;
</script>

<svelte:head>
	<title>{windowTitle}</title>
</svelte:head>

<section class="md:flex gap-2 w-full relative md:px-0 md:pr-16">
	<div
		class="md:space-y-2 py-2 px-2 md:p-0 flex flex-row-reverse md:block justify-between items-center"
	>
		<NavMenu />
		{#if backNav}
			<span class="w-20 h-8">
				<button
					type="button"
					class={`border rounded-md w-full h-full px-2 md:px-4 transition bg-purple-500 hover:bg-purple-400`}
					on:click={() => {
						if (backNav) {
							goto(backNav);
						}
					}}>Back</button
				>
			</span>
		{/if}
		<slot name="sidebar" />
	</div>
	<slot />
</section>
