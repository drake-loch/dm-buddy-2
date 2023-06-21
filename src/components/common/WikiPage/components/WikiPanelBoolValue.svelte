<script lang="ts">
	export let editMode = false;
	export let label = '';
	export let checked = false;
</script>

<span class="flex gap-2 text-sm">
	<!-- <span class="font-semibold text-black">{label}</span> -->
	{#if editMode}
		<span class="flex flex-col w-full">
			<span class="font-semibold text-black">{label} </span>
			<input type="checkbox" class="border px-1 text-black" bind:checked />
		</span>
	{:else}
		<span>
			{#if label !== ''}
				<span class="font-semibold text-black">{label} </span>
			{/if}
			{checked ? 'Yes' : 'No'}
		</span>
	{/if}
</span>
