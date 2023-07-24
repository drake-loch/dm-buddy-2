<script lang="ts">
	import Textarea from '../../form/textarea/Textarea.svelte';

	export let handleApply: () => void;
	export let handleGenerate: () => void;
	export let handleQuickGenerate: undefined | (() => void) = undefined;
	export let expanded: boolean = false;
	export let promptInput = '';

	let toolbarType: 'parse' | 'gen' = 'gen';
</script>

<button
	class={`font-bold text-lg flex justify-between w-full md:hover:bg-gray-400 px-2 rounded-md ${
		expanded ? 'mb-2 pb-2 border-b' : ''
	}`}
	type="button"
	on:click={() => {
		expanded = !expanded;
	}}
>
	<span> GPT Tools </span>
	<span
		class={`text-black flex justify-center items-center text-lg transition px-2  ${
			expanded ? 'rotate-90' : ''
		}`}
	>
		{'>'}
	</span>
</button>

{#if expanded}
	<div class="flex gap-2">
		<button
			type="button"
			class={`border-b border-green-500 py-2 px-1 text-sm flex-grow ${
				toolbarType === 'gen' ? 'bg-gray-500' : ''
			}`}
			on:click={() => {
				toolbarType = 'gen';
				promptInput = '';
			}}>Prompt Generator</button
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

	{#if toolbarType === 'parse'}
		<span class="w-full my-2 md:mb-0">
			<Textarea
				_class="w-full min-h-[20rem] rounded-md bg-gray-700"
				label="Results"
				name="propt-input"
				bind:value={promptInput}
				editMode={true}
				placeholder="Paste results here"
			/>
		</span>

		<!-- button is commented out because I can't use clipboard functions in firefox :'(  -->

		<!-- <button
				type="button"
				class="border border-green-500 py-2"
				on:click={() => {
					navigator.clipboard.readText().then((text) => {
						promptInput = text;
					});
				}}>Paste</button
			> -->

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
					}}>Generate Quick Prompt</button
				>
			{/if}
		</div>
		<button
			type="button"
			class="border border-green-500 py-2 w-full"
			on:click={() => {
				navigator.clipboard.writeText(promptInput);
			}}>Copy</button
		>
	{/if}
{/if}
