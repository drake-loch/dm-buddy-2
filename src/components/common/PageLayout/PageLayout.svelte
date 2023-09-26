<script lang="ts">
	import NavMenu from '../../nav/NavMenu.svelte';

	export let windowTitle = 'DM Buddy';
</script>

<svelte:head>
	<title>{windowTitle}</title>
</svelte:head>

<section class="md:flex gap-2 w-full relative md:px-0 md:pr-16">
	<div
		class="md:space-y-2 py-2 px-2 md:p-0 flex flex-row-reverse md:block justify-between items-center"
	>
		<NavMenu />
		<slot name="sidebar" />
	</div>
	<slot />
</section>
