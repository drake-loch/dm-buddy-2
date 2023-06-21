<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import PromptTool from '../../../components/common/PromptTool/PromptTool.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import {
		handleCharacterPromptInput,
		newEmptyCharacter
	} from '../../../utilities/helpers/charHelper';
	import { getCharacter, saveCharacter } from '../../../utilities/helpers/dataManager';

	import { generateRandomCharPrompt } from '../../../utilities/helpers/promptHelper';

	import CharCreate from '../../../pages/CharCreate/index.svelte';
	import NpcWikiPage from '../../../components/common/WikiPage/NpcWikiPage.svelte';
	import CharWikiPage from '../../../components/common/WikiPage/CharWikiPage.svelte';
	import { goto } from '$app/navigation';

	// export let id = 0;
	export let data;

	let char = getCharacter(+data.id) ?? newEmptyCharacter();

	let editMode = false;
	let promptInput = '';
	let wikiView = false;
</script>

<PageLayout>
	<Toolbar>
		<div class="mb-4 w-full flex flex-col gap-2">
			<button
				type="button"
				class="border border-orange-500 rounded-sm px-4 mb-2"
				on:click={() => {
					wikiView = !wikiView;
				}}>{wikiView ? 'Sheet' : 'Wiki'}</button
			>
			{#if editMode}
				<button
					type="button"
					class="border border-green-500 rounded-sm px-4"
					on:click={() => {
						const id = saveCharacter(char);
						goto(`/characters/${id}`);
						editMode = !editMode;
					}}>Save Character</button
				>
				<button type="button" class="border border-red-500 rounded-sm px-4">Delete Character</button
				>
				<button
					type="button"
					class="border border-gray-200 rounded-sm px-4"
					on:click={() => {
						editMode = !editMode;
					}}>Cancel</button
				>
			{:else}
				<button
					type="button"
					class="border border-blue-500 rounded-sm px-4"
					on:click={() => {
						editMode = !editMode;
					}}>Edit</button
				>
			{/if}
		</div>

		{#if editMode}
			<PromptTool
				bind:promptInput
				handleApply={() => {
					char = handleCharacterPromptInput(char, promptInput);
				}}
				handleGenerate={() => {
					promptInput = generateRandomCharPrompt(char);
				}}
			/>
		{/if}
	</Toolbar>
	{#if char !== undefined}
		{#if wikiView}
			<CharWikiPage bind:char {editMode} />
		{:else}
			<CharCreate {char} {editMode} />
		{/if}
	{/if}
</PageLayout>
