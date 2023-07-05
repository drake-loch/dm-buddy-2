<script lang="ts">
	export let deleteWarning = false;
	export let deleteModule: () => void = () => {};
</script>

{#if deleteWarning}
	<div class="bg-red-500 text-white rounded-md p-2 mb-2">
		<p class="text-sm mb-2">
			<span class="inline font-bold text-md"> Warning: </span>
			Are you sure you want to Delete?
		</p>
		<button
			type="button"
			aria-label="confirm delete module"
			class="px-2 py-0.5 bg-green-500 rounded-md border"
			on:click={() => {
				deleteModule();
			}}>Yes, I want to delete</button
		>
		<button
			type="button"
			aria-label="cancel delete module"
			class="px-2 py-0.5 bg-red-500 rounded-md border"
			on:click={() => {
				deleteWarning = false;
			}}>Cancel</button
		>
	</div>
{/if}
