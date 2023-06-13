<script lang="ts">
	export let value = '';
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let _class = '';
	export let editMode = false;
	export let disabled = false;
</script>

<div class="flex flex-col">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	{#if editMode}
		<textarea
			{placeholder}
			{name}
			class={`w-full rounded-md p-2 bg-gray-600 disabled:bg-slate-800 disabled:cursor-not-allowed ${_class}`}
			bind:value
			{disabled}
		/>
	{:else if !editMode}
		<p class={`w-full border border-black rounded-md p-2`}>{value}</p>
	{/if}
</div>
