<script lang="ts">
	import Textarea from '../../form/textarea/Textarea.svelte';

	export let handleApply: () => void;
	export let handleGenerate: () => void;
	export let handleQuickGenerate: undefined | (() => void) = undefined;
	export let promptInput = '';

	let toolbarType: 'parse' | 'gen' = 'gen';
</script>

<div class="flex gap-2">
	<button
		type="button"
		class={`border-b border-green-500 py-2 px-1 text-sm flex-grow ${
			toolbarType === 'gen' ? 'bg-gray-500' : ''
		}`}
		on:click={() => {
			toolbarType = 'gen';
			promptInput = '';
		}}>Generator</button
	>
	<button
		type="button"
		class={`border-b border-green-500 py-2 px-1 text-sm flex-grow ${
			toolbarType === 'parse' ? 'bg-gray-500' : ''
		}`}
		on:click={() => {
			toolbarType = 'parse';
			promptInput = '';
		}}>Result Handler</button
	>
</div>

<div class="space-y-2">
	{#if toolbarType === 'parse'}
		<span class="w-full">
			<Textarea
				_class="w-full min-h-[20rem] rounded-md bg-gray-700"
				name="propt-input"
				bind:value={promptInput}
				editMode={true}
				placeholder="Paste results here"
			/>
		</span>

		<button type="button" class="border border-green-500 py-2 w-full" on:click={() => handleApply()}
			>Apply Prompt</button
		>
	{:else if toolbarType === 'gen'}
		<span class="w-full my-2 md:mb-0">
			<Textarea
				_class="w-full min-h-[20rem] rounded-md bg-gray-700"
				name="propt-input"
				bind:value={promptInput}
				editMode={true}
				placeholder="Click Generate Prompt to begin"
				disabled={promptInput === ''}
			/>
		</span>

		<div class="flex w-full gap-4">
			<button
				type="button"
				class="border border-green-500 py-2 w-full"
				on:click={() => {
					handleGenerate();
				}}>Generate Prompt</button
			>
			{#if handleQuickGenerate !== undefined}
				<button
					type="button"
					class="border border-green-500 py-2 w-full"
					on:click={() => {
						if (handleQuickGenerate !== undefined) {
							handleQuickGenerate();
						}
					}}>Quick Prompt</button
				>
			{/if}
		</div>
		<button
			type="button"
			class="border border-green-500 py-2 w-full mt-4"
			on:click={() => {
				navigator.clipboard.writeText(promptInput);
			}}>Copy</button
		>
	{/if}
</div>
