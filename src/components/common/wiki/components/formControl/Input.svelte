<script lang="ts">
	import { classes } from '../../../../../utilities/utilities';

	export let value: string | number = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let inputClass: string = '';
	export let autocomplete: string = 'off';
	export let list: string | undefined = undefined;
</script>

<span class="flex w-full justify-between gap-2">
	{#if label}
		<label for={name} class={classes(`w-1/3 ${labelClass}`)}>{label}</label>
		<input
			type="text"
			{name}
			bind:value
			{placeholder}
			{autocomplete}
			{list}
			class={classes(`px-1 w-2/3 text-sm bg-gray-300 ${inputClass}`)}
		/>
	{:else}
		<input
			type="text"
			{name}
			bind:value
			{placeholder}
			{autocomplete}
			{list}
			class={classes(`px-1 w-full text-sm bg-gray-300 ${inputClass}`)}
		/>
	{/if}
</span>

<style>
	label,
	input {
		@apply text-black;
	}
</style>
