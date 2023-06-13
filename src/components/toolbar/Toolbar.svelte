<script lang="ts">
	import Nav from './components/Nav.svelte';

	export let viewNav = false;
</script>

<div
	class="border border-white w-[25rem] h-[52rem] overflow-auto p-4 box-border flex flex-col gap-4"
>
	<!-- Nav -->
	{#if viewNav}
		<span class="w-8 h-8 ml-auto">
			{#if $$slots.default}
				<button
					type="button"
					class="border rounded-md w-full h-full hover:bg-gray-400"
					on:click={() => {
						viewNav = false;
					}}>{'>'}</button
				>
			{/if}
		</span>
		<h2 class="text-center text-2xl font-bold border-b border-white pb-2">Navigation</h2>
		<Nav />
	{/if}
	<!-- Toolbar -->
	{#if !viewNav}
		<span class="w-8 h-8">
			<button
				type="button"
				class="border rounded-md w-full h-full hover:bg-gray-400"
				on:click={() => {
					viewNav = true;
				}}>{'<'}</button
			>
		</span>
		<h2 class="text-center text-2xl font-bold border-b border-white pb-2">TOOLBAR</h2>
		<slot />
	{/if}
</div>
