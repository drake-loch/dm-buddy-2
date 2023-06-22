<script lang="ts">
	export let editMode = false;
	export let label = '';
	export let value: string | number = '';
	export let options: { label: string; value: string | number; url?: string }[] = [];

	$: selected = options.find((o) => o.value === value);
</script>

<span class="flex gap-2 text-sm">
	{#if editMode}
		<span class="flex flex-col w-full">
			<span class="font-semibold text-black">{label}</span>
			<select name={`${label}-select`} />
		</span>
	{:else}
		<span>
			{#if label !== ''}
				<span class="font-semibold text-black">{label}</span>
			{/if}
			{#if selected?.url}
				<a href={selected.url}>{selected.value}</a>
			{:else}
				{value}
			{/if}
		</span>
	{/if}
</span>
