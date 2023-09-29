<script lang="ts">
	export let value: string | number = '';
	export let name: string = '';
	export let size: number | undefined = undefined;

	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let selectClass: string = '';
</script>

<span class="flex w-full justify-between gap-2">
	{#if label}
		<label for={name} class={`w-1/3 ${labelClass}`}>{label}</label>
	{/if}
	<select {name} bind:value class={`px-1 w-2/3 ${selectClass}`} {size}>
		<option value="" disabled>Select Value</option>
		<slot />
	</select>
</span>

<style>
	label,
	select {
		@apply text-black;
	}
</style>
