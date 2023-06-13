<script lang="ts">
	export let value: string | number = '';
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let type: HTMLInputElement['type'] = 'text';
	export let _class = '';
	export let center = true;
	export let editMode = false;
	export let outlined = false;
	export let underlined = false;
	export let labelPosition: 'top' | 'bottom' = 'top';
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
			class={`w-full rounded-md px-2 bg-gray-600 ${
				outlined ? 'border border-black rounded-md' : ''
			} ${underlined ? 'border-b border-black pb-1 rounded-md' : ''} ${_class}`}
			bind:value
			type="text"
		/>
	{:else if !editMode}
		<p
			class={`w-full min-h-[1.5rem] ${outlined ? 'border border-black rounded-md' : ''} ${
				underlined ? 'border-b border-black pb-1 rounded-md' : ''
			} ${_class}`}
		>
			{value}
		</p>
	{/if}
	{#if label && labelPosition === 'bottom'}
		<label for={name} class="text-ellipsis overflow-hidden whitespace-nowrap text-sm italic"
			>{label}</label
		>
	{/if}
</div>
