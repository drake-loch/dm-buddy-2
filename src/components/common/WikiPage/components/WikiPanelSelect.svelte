<script lang="ts">
	type T = $$Generic;
	export let editMode = false;
	export let label = '';
	export let value: T = '' as unknown as T;
	export let options: { label: string; value: T; url?: string }[] = [];

	export let change: (value: Event) => void = () => {};

	$: selected = options.find((o) => o.value === value);
</script>

<span class="flex gap-2 text-sm">
	{#if editMode}
		<span class="flex flex-col w-full">
			<span class="font-semibold text-black">{label}</span>
			<select name={`${label}-select`} class="text-black px-1" bind:value on:change={change}>
				<option value="" disabled>Select Option</option>
				{#each options as option}
					<option class="text-black" value={option.value} selected={option.value === value}
						>{option.label}</option
					>
				{/each}
			</select>
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
