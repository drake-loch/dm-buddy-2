<script lang="ts">
	export let value: string = '';
	export let name: string = '';
	export let size: number | undefined = undefined;

	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let selectClass: string = '';
</script>

{#if label}
	<label for={name} class={labelClass}>{label}</label>
{/if}
<select {name} {value} class={`px-1 ${selectClass}`} {size}>
	<option value="" disabled>Select Value</option>
	<slot />
</select>

<style>
	label,
	select {
		@apply text-black;
	}
</style>
