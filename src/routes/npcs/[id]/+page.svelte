<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import PromptTool from '../../../components/common/PromptTool/PromptTool.svelte';
	import NpcWikiPage from '../../../components/common/WikiPage/NpcWikiPage.svelte';
	import DeleteBanner from '../../../components/common/deleteBanner/DeleteBanner.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { deleteNPC, getNPC, updateNPC } from '../../../utilities/helpers/dataManager';
	import {
		newEmptyNPC,
		handleNPCPromptInput
	} from '../../../utilities/helpers/npcHelper/npcHelper';
	import {
		generateQuickNPCPrompt,
		generateRandomNPCPrompt
	} from '../../../utilities/helpers/promptHelper';

	export let data;

	let npc = getNPC(+data.id) ?? newEmptyNPC();

	let editMode = Number.isNaN(data.id) ?? false;
	let isNew = Number.isNaN(data.id) ?? false;

	let promptInput = '';
	let deleteWarning = false;
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
				handleQuickGenerate={() => {
					promptInput = generateQuickNPCPrompt(npc);
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

		<div class="w-full h-full px-2" slot="mobile-tools">
			<div class={`w-full h-full flex items-center gap-2 ${editMode ? 'mb-4' : ''}`}>
				{#if editMode}
					<button
						type="button"
						class="border border-green-500 rounded-sm px-4 text-sm"
						on:click={() => {
							editMode = !editMode;
							const id = updateNPC(npc);
							if (isNew) {
								goto(`/npcs/${id}`);
							}
						}}>Save</button
					>
					<button
						type="button"
						class="border border-red-500 rounded-sm px-4 text-sm"
						on:click={() => {
							deleteWarning = true;
						}}>Delete</button
					>
					<button
						type="button"
						class="border border-gray-200 rounded-sm px-4 text-sm"
						on:click={() => {
							editMode = !editMode;
						}}>Cancel</button
					>
				{:else}
					<button
						type="button"
						class="border border-blue-500 rounded-sm px-4 text-sm"
						on:click={() => {
							editMode = !editMode;
						}}>Edit</button
					>
				{/if}
			</div>
			<DeleteBanner
				bind:deleteWarning
				deleteModule={() => {
					deleteNPC(npc.id);
					deleteWarning = false;
					goto(`/npcs`);
				}}
			/>
			{#if editMode}
				<PromptTool
					bind:promptInput
					handleApply={() => {
						npc = handleNPCPromptInput(npc, promptInput);
						npc = npc;
					}}
					handleGenerate={() => {
						promptInput = generateRandomNPCPrompt(npc);
					}}
					handleQuickGenerate={() => {
						promptInput = generateQuickNPCPrompt(npc);
					}}
				/>
			{/if}
		</div>
	</Toolbar>
	{#if npc !== undefined}
		<NpcWikiPage bind:npc {editMode} save={updateNPC} />
	{/if}
</PageLayout>
