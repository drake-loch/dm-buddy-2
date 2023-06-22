<script lang="ts">
	export let editMode = false;
	export let label = '';
	export let values: string[] | number[] = [];
	export let options: Option[] = [];

	type Option = { label: string; value: string | number; url?: string };

	let stringValues: string[] = [];
	let numberValues: number[] = [];

	if (Array.isArray(values)) {
		if (values.length > 0 && typeof values[0] === 'string') {
			stringValues = values as string[];
		} else if (values.length > 0 && typeof values[0] === 'number') {
			numberValues = values as number[];
		}
	}

	$: selected = options.filter((o) =>
		Array.isArray(values)
			? stringValues.includes(o.value as string) || numberValues.includes(o.value as number)
			: false
	);

	const selectOption = (option: Option['value']) => {
		if (Array.isArray(values)) {
			if (typeof option === 'string') {
				if (stringValues.includes(option as string)) {
					stringValues = stringValues.filter((v) => v !== option);
				} else {
					stringValues.push(option as string);
				}
				values = [...stringValues];
			} else if (typeof option === 'number') {
				if (numberValues.includes(option as number)) {
					numberValues = numberValues.filter((v) => v !== option);
				} else {
					numberValues.push(option as number);
				}
				values = [...numberValues];
			} else {
			}
		}
		values = values;
	};
	const handleChange = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		const target = event.explicitOriginalTarget as HTMLOptionElement;
		target.selected = !target.selected;
		selectOption(target.value);
	};
</script>

{#if values.length > 0 || editMode}
	<span class="flex gap-2 text-sm">
		{#if editMode}
			<span class="flex flex-col w-full">
				<span class="font-semibold text-black">{label}</span>
				<select
					name={`${label}-select`}
					bind:value={values}
					class="text-black"
					multiple
					on:change={handleChange}
				>
					{#each options as o, i}
						<option value={o.value} class={`text-black focus:bg-blue-300`}>
							<input
								type="checkbox"
								name={`${o.label}-checkbox`}
								checked={!!selected.find((s) => s.value === o.value) ?? false}
								class="text-black border"
							/>
							{o.label}
						</option>
					{/each}
				</select>
			</span>
		{:else}
			<span>
				{#if label !== ''}
					<span class="font-semibold text-black">{label}</span>
				{/if}
				{#each selected as s, i}
					{#if s?.url}
						<a href={s.url}>{`${s.value}, `}</a>
					{:else}
						{`${s.value}, `}
					{/if}
				{/each}
			</span>
		{/if}
	</span>
{/if}
