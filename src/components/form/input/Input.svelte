<script lang="ts">
	export let value: string | number = '';
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let type: HTMLInputElement['type'] = 'text';
	export let _class = '';
	export let viewClass = '';
	export let center = true;
	export let editMode = false;
	export let labelPosition: 'top' | 'bottom' = 'top';
	export let options: string[] = [];
</script>

<div class={`flex flex-col ${center ? 'items-center' : ''}`}>
	{#if label && labelPosition === 'top'}
		<label for={name} class="text-ellipsis overflow-hidden whitespace-nowrap text-sm">{label}</label
		>
	{/if}
	{#if type === 'text' && editMode}
		<input
			{placeholder}
			{name}
			class={`w-full rounded-md px-2 bg-gray-600 ${_class}`}
			bind:value
			type="text"
			list={options.length > 0 ? name + '-list' : undefined}
		/>
		{#if options.length > 0}
			<datalist id={name + '-list'}>
				{#each options as option}
					<option value={option} />
				{/each}
			</datalist>
		{/if}
	{:else if !editMode}
		<p class={`w-full min-h-[1.5rem] ${editMode ? '' : viewClass}`}>
			{value}
		</p>
	{/if}
	{#if label && labelPosition === 'bottom'}
		<label for={name} class="text-ellipsis overflow-hidden whitespace-nowrap text-sm italic"
			>{label}</label
		>
	{/if}
</div>
