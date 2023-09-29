<script lang="ts">
	import Controls from './components/Controls.svelte';
	import Nav from './components/Nav.svelte';

	export let viewNav = false;
	export let _class = '';

	export let editMode = false;
	export let formName: string | undefined = undefined;
</script>

<div
	class={`border border-white w-[25rem] h-[52rem] overflow-auto p-4 box-border hidden md:flex flex-col gap-4  ${_class}`}
>
	{#if viewNav}
		<h2 class="text-center text-2xl font-bold border-b border-white pb-2">Navigation</h2>
		<Nav />
	{/if}
	{#if !viewNav}
		<div class="flex gap-2">
			<span class="w-fit h-8">
				<button
					type="button"
					class="border rounded-md w-full h-full hover:bg-gray-400 px-2"
					on:click={() => {
						viewNav = true;
					}}>Menu</button
				>
			</span>
		</div>
		<h2 class="text-center text-2xl font-bold border-b border-white pb-2">TOOLBAR</h2>
		{#if $$slots.custom}
			<slot name="custom" />
		{:else}
			<Controls bind:editMode bind:formName />
		{/if}
	{/if}
</div>

<div class="w-full h-12 bg-gray-800 px-2 md:hidden">
	<button
		class="flex flex-col w-10 h-full justify-center gap-2"
		type="button"
		on:click={() => {
			viewNav = !viewNav;
		}}
	>
		<span
			class={`w-full h-1 transition ${viewNav ? 'rotate-45 translate-y-1 bg-red-300' : 'bg-white'}`}
		/>
		<span class={`w-full h-1 ${viewNav ? 'hidden' : 'bg-white'}`} />
		<span
			class={`w-full h-1 transition ${
				viewNav ? '-rotate-45 -translate-y-2 bg-red-300' : 'bg-white'
			}`}
		/>
	</button>
</div>
<div class="w-full bg-gray-600 md:hidden mb-4 py-2">
	{#if viewNav}
		<h2 class="text-center text-2xl font-bold border-white pb-2">Navigation</h2>
		<Nav />
	{:else if $$slots.custom}
		<slot name="custom" />
	{:else}
		<Controls bind:editMode bind:formName />
	{/if}
</div>
