<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../../../components/common/PageLayout/PageLayout.svelte';
	import CharWikiPage from '../../../../../components/common/WikiPage/CharWikiPage.svelte';
	import QuestWiki from '../../../../../components/common/WikiPage/QuestWiki.svelte';
	import SessionWiki from '../../../../../components/common/WikiPage/SessionWiki.svelte';
	import Toolbar from '../../../../../components/toolbar/Toolbar.svelte';
	import {
		addQuestToCampaign,
		addSessionToCampaign,
		deleteSession,
		getQuest,
		getSession,
		newQuest,
		newSession,
		saveQuest,
		saveSession
	} from '../../../../../utilities/helpers/campaignHelper';
	import CharCreate from '../../../../../pages/CharCreate/index.svelte';
	import { getCharacter, getNPC } from '../../../../../utilities/helpers/dataManager';
	import NpcWikiPage from '../../../../../components/common/WikiPage/NpcWikiPage.svelte';
	import { newEmptyNPC } from '../../../../../utilities/helpers/npcHelper/npcHelper';
	import DeleteBanner from '../../../../../components/common/deleteBanner/DeleteBanner.svelte';

	export let data;

	let session = getSession(+data.sessionId) ?? newSession();

	let editMode = Number.isNaN(data.sessionId) ?? false;
	let isNew = Number.isNaN(data.sessionId) ?? false;

	let wikiView = true;
	let toggleMod = false;

	let charId: number | undefined = undefined;
	let charViewType: 'wiki' | 'sheet' = 'wiki';

	let npcId: number | undefined = undefined;

	let entityView: 'npc' | 'character' | 'quest' | 'session' | 'createNpc' | undefined = undefined;

	const viewEntity = (type: string, id: number) => {
		entityView = type as 'npc' | 'character' | 'quest' | 'session';
		if (type === 'npc') {
			npcId = id;
		} else if (type === 'character') {
			charId = id;
		}
		toggleMod = true;
	};

	let deleteWarning = false;
</script>

<PageLayout>
	{#if toggleMod}
		<div class="absolute w-full h-full bg-black/80 flex justify-center py-2 overflow-auto">
			{#if entityView === 'character'}
				{#if charId !== undefined}
					{#if charViewType === 'wiki'}
						<CharWikiPage char={getCharacter(charId)} />
					{:else}
						<CharCreate char={getCharacter(charId)} />
					{/if}
				{/if}
				<div class="p-2 relative">
					<div class={`absolute flex gap-2 ${charViewType === 'wiki' ? '-left-20' : ''}`}>
						{#if charViewType === 'wiki'}
							<button
								type="button"
								class="bg-orange-500 w-5 h-5 p-4 flex justify-center items-center rounded-full hover:bg-orange-600"
								on:click={() => {
									charViewType = 'sheet';
								}}>📃</button
							>
						{:else}
							<button
								type="button"
								class="bg-orange-500 w-5 h-5 p-4 flex text-sm justify-center items-center rounded-full hover:bg-orange-600"
								on:click={() => {
									charViewType = 'wiki';
								}}>Wiki</button
							>
						{/if}

						<button
							type="button"
							class="bg-red-500 w-5 h-5 p-4 flex justify-center items-center rounded-full hover:bg-red-600"
							on:click={() => {
								toggleMod = false;
								charId = undefined;
							}}>X</button
						>
					</div>
				</div>
			{:else if entityView === 'npc'}
				{#if npcId !== undefined}
					{#if charViewType === 'wiki'}
						<NpcWikiPage npc={getNPC(npcId)} />
					{/if}
				{/if}
				<div class="p-2 relative">
					<div class={`absolute flex gap-2 -left-20`}>
						<button
							type="button"
							class="bg-red-500 w-5 h-5 p-4 flex justify-center items-center rounded-full hover:bg-red-600"
							on:click={() => {
								toggleMod = false;
								charId = undefined;
							}}>X</button
						>
					</div>
				</div>
			{:else if entityView === 'createNpc'}
				{#if charViewType === 'wiki'}
					<Toolbar _class="bg-gray-700 mr-2">
						<div class="flex w-full gap-4">
							<button
								type="button"
								class="border border-green-500 rounded-sm px-4 w-full"
								on:click={() => {
									const id = saveSession(session);
									console.log(id);

									addSessionToCampaign(+data.campaignId, id);
									if (isNew) {
										if (data.campaignId !== undefined) {
											goto(`/campaigns/${data.campaignId}/sessions/${id}`);
										} else {
											goto(`/sessions/${id}`);
										}
									}
									editMode = !editMode;
								}}>Save Session</button
							>
							<button type="button" class="border border-red-500 rounded-sm px-4 w-full"
								>Delete Session</button
							>
						</div>
					</Toolbar>
					<NpcWikiPage editMode />
				{/if}
				<div class="p-2 relative">
					<div class={`absolute flex gap-2 -left-20`}>
						<button
							type="button"
							class="bg-red-500 w-5 h-5 p-4 flex justify-center items-center rounded-full hover:bg-red-600"
							on:click={() => {
								toggleMod = false;
								charId = undefined;
							}}>X</button
						>
					</div>
				</div>
			{/if}
		</div>
	{/if}
	<Toolbar>
		<div class="mb-4 w-full flex flex-col gap-2">
			{#if editMode}
				<div class="flex w-full gap-4">
					<button
						type="button"
						class="border border-green-500 rounded-sm px-4 w-full"
						on:click={() => {
							const id = saveSession(session);
							console.log(id);

							addSessionToCampaign(+data.campaignId, id);
							if (isNew) {
								if (data.campaignId !== undefined) {
									goto(`/campaigns/${data.campaignId}/sessions/${id}`);
								} else {
									goto(`/sessions/${id}`);
								}
							}
							editMode = !editMode;
						}}>Save Session</button
					>
					<button type="button" class="border border-red-500 rounded-sm px-4 w-full"
						>Delete Session</button
					>
				</div>

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
					class="border border-orange-500 rounded-sm px-4"
					on:click={() => {
						goto(`/campaigns/${data.campaignId}`);
					}}>Return To Campaign</button
				>

				<button
					type="button"
					class="border border-blue-500 rounded-sm px-4"
					on:click={() => {
						editMode = !editMode;
					}}>Edit</button
				>
			{/if}
			<button
				type="button"
				class="border border-blue-500 rounded-sm px-4"
				on:click={() => {
					entityView = 'createNpc';
					toggleMod = true;
				}}>Quick NPC</button
			>
		</div>
		<!-- mobile -->
		<div class="w-full h-full px-2" slot="mobile-tools">
			<div class={`w-full h-full flex items-center gap-2 ${editMode ? 'mb-4' : ''}`}>
				{#if editMode}
					<button
						type="button"
						class="border border-green-500 rounded-sm px-4 text-sm"
						on:click={() => {
							const id = saveSession(session);
							addQuestToCampaign(+data.campaignId, id);
							if (isNew) {
								goto(`/campaigns/${data.campaignId}`);
							}
							editMode = !editMode;
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
					<button
						type="button"
						class="border border-orange-500 rounded-sm px-4 text-sm"
						on:click={() => {
							goto(`/campaigns/${data.campaignId}`);
						}}>Return To Campaign</button
					>
				{/if}
			</div>
			<DeleteBanner
				bind:deleteWarning
				deleteModule={() => {
					deleteSession(session.id);
					deleteWarning = false;
					goto(`/campaigns/`);
				}}
			/>
		</div>
	</Toolbar>
	{#if session !== undefined}
		{#if wikiView}
			<SessionWiki {editMode} {session} toggleMod={viewEntity} />
		{/if}
	{/if}
</PageLayout>
