<script lang="ts">
	export let editMode = false;
	export let formName: string | undefined = undefined;
</script>

<div class="px-2 md:px-0 w-full flex items-center md:items-start md:flex-col gap-2">
	{#if editMode}
		<button type="submit" class="border-green-500 md:w-full" form={formName}>Save</button>
		<button type="button" class="border-red-500 md:w-full">Delete</button>
		<button
			type="button"
			class="border-gray-200 md:w-full"
			on:click={() => {
				editMode = !editMode;
			}}>Cancel</button
		>
	{:else}
		<button
			type="button"
			class="border-blue-500 md:w-full"
			on:click={() => {
				editMode = !editMode;
			}}>Edit</button
		>
	{/if}
</div>

<style>
	button {
		@apply border rounded-sm px-4;
	}
</style>
