<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import PromptTool from '../../../components/common/PromptTool/PromptTool.svelte';
	import NpcWikiPage from '../../../components/common/WikiPage/NpcWikiPage.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { getNPC, updateNPC } from '../../../utilities/helpers/dataManager';
	import {
		newEmptyNPC,
		handleNPCPromptInput
	} from '../../../utilities/helpers/npcHelper/npcHelper';
	import { generateRandomNPCPrompt } from '../../../utilities/helpers/promptHelper';

	export let data;

	let npc = getNPC(+data.id) ?? newEmptyNPC();

	const isNew = Number.isNaN(data.id) ?? false;

	let editMode = false;
	let promptInput = '';
</script>

<PageLayout>
	<Toolbar>
		{#if editMode}
			<button
				on:click={() => {
					editMode = !editMode;
					const id = updateNPC(npc);
					if (isNew) {
						goto(`/npcs/${id}`);
					}
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
	{#if npc !== undefined}
		<NpcWikiPage bind:npc {editMode} save={updateNPC} />
	{/if}
</PageLayout>
