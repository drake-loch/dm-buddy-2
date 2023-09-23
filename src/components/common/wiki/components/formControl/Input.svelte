<script lang="ts">
	export let value: string | number = '';
	export let type: string = 'text';
	export let name: string = '';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let inputClass: string = '';
</script>

<span class="flex w-full justify-between gap-2">
	{#if label}
		<label for={name} class={`w-1/3 ${labelClass}`}>{label}</label>
	{/if}
	{#if type === 'text'}
		<input type="text" {name} bind:value {placeholder} class={`px-1 w-2/3 text-sm ${inputClass}`} />
	{:else if type === 'number'}
		<input
			type="number"
			{name}
			bind:value
			{placeholder}
			class={`px-1 w-2/3 text-sm ${inputClass}`}
		/>
	{/if}
</span>

<style>
	label,
	input {
		@apply text-black;
	}
</style>
