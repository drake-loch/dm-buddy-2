<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { goto } from '$app/navigation';
	import CampaignWiki from '../../../components/common/WikiPage/CampaignWiki.svelte';
	import {
		getCampaign,
		newCampaign,
		saveCampaign
	} from '../../../utilities/helpers/campaignHelper';

	export let data;

	let campaign = getCampaign(+data.id) ?? newCampaign();

	let editMode = Number.isNaN(data.id) ?? false;
	let isNew = Number.isNaN(data.id) ?? false;
	console.log(isNew);

	let promptInput = '';
	let wikiView = true;
</script>

<PageLayout>
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
						}}>Save Campaign</button
					>
					<button type="button" class="border border-red-500 rounded-sm px-4 w-full"
						>Delete Campaign</button
					>
				</div>
				{#if !isNew}
					<button
						on:click={() => {
							goto(`/campaigns/${data.id}/quests/new`);
						}}
						type="button"
						class="
            border border-green-500 rounded-md w-full hover:bg-green-400">New Quest</button
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
			<CampaignWiki campaignId={data.id} {editMode} {campaign} />
		{/if}
	{/if}
</PageLayout>
