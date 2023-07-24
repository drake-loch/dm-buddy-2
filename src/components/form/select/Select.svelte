<script lang="ts">
	type T = $$Generic;

	export let editMode = false;
	export let label = '';
	export let values: string[] | number[] | T[] = [];
	export let options: Option[] = [];
	export let change: (values: string[] | number[] | T[]) => void = () => {};
	export let labelAccessor: (value: T) => string = (value) => value as unknown as string;

	type Option = { label: string; value: string | number | T; action?: () => void };

	let stringValues: string[] = [];
	let numberValues: number[] = [];

	if (Array.isArray(values)) {
		if (values.length > 0 && typeof values[0] === 'string') {
			stringValues = values as string[];
		} else if (values.length > 0 && typeof values[0] === 'number') {
			numberValues = values as number[];
		}
	}

	$: selected =
		options.filter((o) =>
			Array.isArray(values)
				? stringValues.includes(o.value as string) ||
				  numberValues.includes(o.value as number) ||
				  values.includes((val) => val === o.value)
				: false
		) ?? [];

	const selectOption = (option: Option['value']) => {
		if (Array.isArray(values)) {
			if (typeof option === 'string') {
				if (stringValues.includes(option)) {
					stringValues = stringValues.filter((v) => v !== option);
				} else {
					stringValues.push(option);
				}
				values = [...stringValues];
			} else if (typeof option === 'number') {
				if (numberValues.includes(option)) {
					numberValues = numberValues.filter((v) => v !== option);
				} else {
					numberValues.push(option);
				}
				values = [...numberValues];
			} else if (typeof option === 'object' && option !== null) {
				if (values.includes(option)) {
					values = values.filter((v) => v !== option);
				} else {
					values = [...values, option];
				}
			}
		}
		change(values);
		values = values;
	};

	let collapsed = true;
</script>

{#if values.length > 0 || editMode}
	<span class="flex gap-2 text-sm w-full">
		{#if editMode}
			<span class="flex flex-col w-full relative">
				<span class="font-semibold text-black">{label}</span>
				<div class="relative">
					<button
						type="button"
						class="border border-black flex bg-gray-100 p-1 text-xs min-h-[2rem] w-full"
						on:click={() => {
							collapsed = !collapsed;
						}}
					>
						<span class="flex flex-wrap space-x-0.5 w-full">
							{#each selected as s, i}
								<p class="text-black">
									{s.label}{i + 1 == selected.length ? '' : ','}
								</p>
							{/each}
						</span>
						<p
							class={`text-black flex justify-center items-center text-lg transition px-2  ${
								collapsed ? '' : 'rotate-90'
							}`}
						>
							{'>'}
						</p>
					</button>
					{#if !collapsed}
						<div class="text-black border border-black flex flex-col w-full border-t-0">
							{#each options as o, i}
								<button
									class={`text-black focus:bg-blue-300 w-full flex px-2 py-0.5 space-x-6 ${
										i % 2 === 0 ? 'bg-gray-500' : 'bg-gray-600'
									}`}
									on:click={() => {
										selectOption(o.value);
									}}
								>
									<input
										type="checkbox"
										name={`${o.label}-checkbox`}
										checked={!!selected.find((s) => s.value === o.value) ?? false}
										class="text-black border hover:cursor-pointer"
									/>
									<span class="inline w-full text-left">
										{o.label}
									</span>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</span>
		{:else}
			<span>
				{#if label !== ''}
					<span class="font-semibold text-black">{label}</span>
				{/if}
				{#each selected as s, i}
					{#if s?.action}
						<button type="button" class="" on:click={s.action}>
							<span class="inline text-blue-400 underline hover:text-blue-500">{s.label}</span><span
								class="inline text-black mr-1">{i + 1 == selected.length ? '' : ','}</span
							>
						</button>
					{:else}
						{s.label}{i + 1 == selected.length ? '' : ','}
					{/if}
				{/each}
			</span>
		{/if}
	</span>
{/if}
