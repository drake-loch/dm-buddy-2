<script lang="ts">
	import Textarea from '../../form/textarea/Textarea.svelte';

	export let handleApply: () => void;
	export let handleGenerate: () => void;

	export let promptInput = '';
	let toolbarType: 'parse' | 'gen' = 'gen';
</script>

<h3 class="font-bold text-lg">GPT Tools</h3>

<div class="flex gap-2">
	<button
		type="button"
		class={`border border-green-500 py-2 px-4 ${toolbarType === 'gen' ? 'bg-gray-500' : ''}`}
		on:click={() => {
			toolbarType = 'gen';
			promptInput = '';
		}}>Prompt Generator</button
	>
	<button
		type="button"
		class={`border border-green-500 py-2 px-4 ${toolbarType === 'parse' ? 'bg-gray-500' : ''}`}
		on:click={() => {
			toolbarType = 'parse';
			promptInput = '';
		}}>Parse Results</button
	>
</div>

{#if toolbarType === 'parse'}
	<span class="">
		<Textarea
			_class="w-full min-h-[20rem] rounded-md"
			label="Parse Results"
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

	<button type="button" class="border border-green-500 py-2" on:click={() => handleApply()}
		>Apply Prompt</button
	>
{:else if toolbarType === 'gen'}
	<span class="">
		<Textarea
			_class="w-full min-h-[20rem] rounded-md"
			label="Prompt Generator"
			name="propt-input"
			bind:value={promptInput}
			editMode={true}
			placeholder="Click Generate Prompt to begin"
			disabled={promptInput === ''}
		/>
	</span>

	<button
		type="button"
		class="border border-green-500 py-2"
		on:click={() => {
			handleGenerate();
		}}>Generate Prompt</button
	>
	<button
		type="button"
		class="border border-green-500 py-2"
		on:click={() => {
			navigator.clipboard.writeText(promptInput);
		}}>Copy</button
	>
{/if}
