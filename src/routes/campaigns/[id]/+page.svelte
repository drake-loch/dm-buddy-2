<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { goto } from '$app/navigation';
	import CampaignWiki from '../../../components/common/WikiPage/CampaignWiki.svelte';
	import {
		deleteCampaign,
		getCampaign,
		newCampaign,
		saveCampaign
	} from '../../../utilities/helpers/campaignHelper';
	import DeleteBanner from '../../../components/common/deleteBanner/DeleteBanner.svelte';
	import CharWikiPage from '../../../components/common/WikiPage/CharWikiPage.svelte';
	import { getCharacter, saveCharacter } from '../../../utilities/helpers/dataManager';
	import CharCreate from '../../../pages/CharCreate/index.svelte';

	export let data;

	let campaign = getCampaign(+data.id) ?? newCampaign();

	let editMode = Number.isNaN(data.id) ?? false;
	let isNew = Number.isNaN(data.id) ?? false;

	let promptInput = '';
	let wikiView = true;

	let deleteWarning = false;

	let toggleMod = false;

	let charId: number | undefined = undefined;

	const viewChar = (id: number) => {
		charId = id;
		toggleMod = true;
	};
	let charViewType: 'wiki' | 'sheet' = 'wiki';
</script>

<PageLayout>
	{#if toggleMod}
		<div class="absolute w-full h-full bg-black/80 flex justify-center">
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
							const id = saveCampaign(campaign);
							goto(`/campaigns/${id}`);
							editMode = !editMode;
						}}
					>
						Save Campaign
					</button>
					<button
						type="button"
						class="border border-red-500 rounded-sm px-4 w-full"
						on:click={() => {
							deleteWarning = true;
						}}
					>
						Delete Campaign
					</button>
				</div>
				<DeleteBanner
					{deleteWarning}
					deleteModule={() => {
						deleteCampaign(campaign.id);
						deleteWarning = false;
						goto(`/campaigns/`);
					}}
				/>
				{#if !isNew}
					<button
						on:click={() => {
							goto(`/campaigns/${data.id}/quests/new`);
						}}
						type="button"
						class="
            border border-green-500 rounded-md w-full hover:bg-green-400">New Quest</button
					>
					<button
						on:click={() => {
							goto(`/campaigns/${data.id}/sessions/new`);
						}}
						type="button"
						class="
            border border-green-500 rounded-md w-full hover:bg-green-400">New Session</button
					>
				{/if}

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
	</Toolbar>
	{#if campaign !== undefined}
		{#if wikiView}
			<!--  -->
			<CampaignWiki campaignId={data.id} {editMode} {campaign} toggleMod={viewChar} />
		{/if}
	{/if}
</PageLayout>
