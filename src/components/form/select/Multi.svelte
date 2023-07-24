<script lang="ts">
	type T = $$Generic;
	type Option = { label: string; value: string | number; action?: () => void };
	export let value: T | T[];
	export let valueKey: string | undefined = undefined;
	export let labelAccessor: (value: T) => string = (value) => value as unknown as string;
	export let valueAccessor: (value: T) => string | number = (value) =>
		value as unknown as string | number;
	export let select: (option: Option) => void = () => {};
	export let editMode = false;
	export let label = '';
	export let options: Option[] = [];

	let collapsed = true;

	// const selectOption = (option: Option) => {
	// 	console.log('selected: ', option);
	// 	console.log('value: ', value, Array.isArray(value));
	// 	if (Array.isArray(value)) {
	// 		const newArrayItem = new T(option.value);
	// 	}
	// 	console.log('value: ', value);

	// 	value = value;
	// };
</script>

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
						{#if Array.isArray(value)}
							{#each value as s, i}
								<p class="text-black">
									{labelAccessor(s)}{i + 1 == value.length ? '' : ','}
								</p>
							{/each}
						{/if}
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
									select(o);
								}}
							>
								<input
									type="checkbox"
									name={`${o.label}-checkbox`}
									checked={value === o.value}
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
			{#if Array.isArray(value)}
				{#each options as s, i}
					{#if s?.action}
						<button type="button" class="" on:click={s.action}>
							<span class="inline text-blue-400 underline hover:text-blue-500">{s.label}</span><span
								class="inline text-black mr-1"
								>{Array.isArray(value) && i + 1 !== value.length ? ',' : ''}</span
							>
						</button>
					{:else}
						{s.label}{Array.isArray(value) && i + 1 !== value.length ? ',' : ''}
					{/if}
				{/each}
			{/if}
		</span>
	{/if}
</span>
