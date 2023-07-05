<script lang="ts">
	export let editMode = false;
	export let label = '';
	export let value: string | number = '';
	export let textarea = false;
	export let showIfEmpty = false;
</script>

{#if value !== '' || editMode || showIfEmpty}
	<span class="flex gap-2 text-sm">
		{#if editMode}
			<span class="flex flex-col w-full">
				<span class="font-semibold text-black">{label} </span>
				{#if !textarea}
					<input type="text" class="border px-1 text-black" bind:value />
				{:else}
					<textarea class="border px-1 text-black w-full" rows="4" bind:value />
				{/if}
			</span>
		{:else}
			<span>
				{#if label !== ''}
					<span class="font-semibold text-black">{label} </span>
				{/if}
				{value}
			</span>
		{/if}
	</span>
{/if}
