<script lang="ts">
	export let value: boolean = false;
	export let name: string = '';
	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let inputClass: string = '';
</script>

{#if label}
	<label for={name} class={labelClass}>{label}</label>
{/if}
<input type="checkbox" bind:checked={value} {name} class={`text-sm ${inputClass}`} />

<style>
	label,
	input {
		@apply text-black;
	}
</style>
