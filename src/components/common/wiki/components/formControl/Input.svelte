<script lang="ts">
	import { classes } from '../../../../../utilities/utilities';

	export let value: string | number = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let inputClass: string = '';
</script>

<span class="flex w-full justify-between gap-2">
	{#if label}
		<label for={name} class={`w-1/3 ${labelClass}`}>{label}</label>
		<input
			type="text"
			{name}
			bind:value
			{placeholder}
			class={classes(`px-1 w-2/3 text-sm ${inputClass}`)}
		/>
	{:else}
		<input
			type="text"
			{name}
			bind:value
			{placeholder}
			class={classes(`px-1 w-full text-sm ${inputClass}`)}
		/>
	{/if}
</span>

<style>
	label,
	input {
		@apply text-black;
	}
</style>
