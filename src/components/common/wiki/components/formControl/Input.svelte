<script lang="ts">
	export let value: string = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let inputClass: string = '';
</script>

{#if label}
	<label for={name} class={labelClass}>{label}</label>
{/if}
<input type="text" {name} {value} {placeholder} class={`px-1 text-sm ${inputClass}`} />

<style>
	label,
	input {
		@apply text-black;
	}
</style>
