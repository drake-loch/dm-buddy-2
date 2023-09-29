<script lang="ts">
	import { classes } from '../../../../../utilities/utilities';

	export let value: string = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let inputClass: string = '';
	export let rows = 4;
	export let textSize = 'text-sm';
	export let className: string = '';
</script>

<span class={classes(`flex w-full items-center justify-center gap-2 ${className}`)}>
	{#if label}
		<label for={name} class={`w-1/3 ${labelClass}`}>{label}</label>
	{/if}
	<textarea {name} bind:value {placeholder} class={`px-1 ${textSize} ${inputClass}`} {rows} />
</span>

<style>
	label,
	textarea {
		@apply text-black;
	}
</style>
