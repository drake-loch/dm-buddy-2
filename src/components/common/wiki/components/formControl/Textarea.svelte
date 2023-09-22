<script lang="ts">
	export let value: string = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let labelClass: string = '';
	export let inputClass: string = '';
</script>

<span class="flex w-full items-center justify-center gap-2">
	{#if label}
		<label for={name} class={`w-1/3 ${labelClass}`}>{label}</label>
	{/if}
	<textarea {name} bind:value {placeholder} class={`px-1 text-sm ${inputClass}`} rows="4" />
</span>

<style>
	label,
	textarea {
		@apply text-black;
	}
</style>
