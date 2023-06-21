<script lang="ts">
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import PromptTool from '../../components/common/PromptTool/PromptTool.svelte';
	import NpcWikiPage from '../../components/common/WikiPage/NpcWikiPage.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import { saveData, updateNPC } from '../../utilities/helpers/dataManager';
	import {
		handleNPCPromptInput,
		newEmptyNPC,
		type NPC
	} from '../../utilities/helpers/npcHelper/npcHelper';
	import { generateRandomNPCPrompt } from '../../utilities/helpers/promptHelper';

	let editMode = false;
	let npc: NPC = newEmptyNPC();

	let promptInput = '';
</script>

<PageLayout>
	<Toolbar>
		{#if editMode}
			<button
				on:click={() => {
					editMode = !editMode;
					updateNPC(npc);
				}}
				type="button"
				class="
                border border-green-500 rounded-md w-full hover:bg-green-400">Save</button
			>
			<button
				on:click={() => {
					editMode = !editMode;
				}}
				type="button"
				class="
                border rounded-md w-full hover:bg-gray-400">Cancel</button
			>

			<PromptTool
				bind:promptInput
				handleApply={() => {
					npc = handleNPCPromptInput(npc, promptInput);
					console.log(npc);
					npc = npc;
				}}
				handleGenerate={() => {
					promptInput = generateRandomNPCPrompt(npc);
				}}
			/>
		{:else}
			<button
				on:click={() => {
					editMode = !editMode;
				}}
				type="button"
				class="
                border border-blue-500 rounded-md w-full hover:bg-blue-400">Edit</button
			>
		{/if}
	</Toolbar>
	<NpcWikiPage {editMode} bind:npc />
</PageLayout>
