<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../../../components/common/PageLayout/PageLayout.svelte';
	import QuestWiki from '../../../../../components/common/WikiPage/QuestWiki.svelte';
	import DeleteBanner from '../../../../../components/common/deleteBanner/DeleteBanner.svelte';
	import Toolbar from '../../../../../components/toolbar/Toolbar.svelte';
	import {
		addQuestToCampaign,
		deleteQuest,
		getQuest,
		newQuest,
		saveQuest
	} from '../../../../../utilities/helpers/campaignHelper';

	export let data;

	let quest = getQuest(+data.questId) ?? newQuest();

	let editMode = Number.isNaN(data.questId) ?? false;
	let isNew = Number.isNaN(data.questId) ?? false;

	let wikiView = true;
	let deleteWarning = false;
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
							const id = saveQuest(quest);
							addQuestToCampaign(+data.campaignId, id);
							if (isNew) {
								goto(`/campaigns/${data.campaignId}`);
							}
							editMode = !editMode;
						}}>Save Quest</button
					>
					<button type="button" class="border border-red-500 rounded-sm px-4 w-full"
						>Delete Quest</button
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
		</div>

		<!-- mobile -->
		<div class="w-full h-full px-2" slot="mobile-tools">
			<div class={`w-full h-full flex items-center gap-2 ${editMode ? 'mb-4' : ''}`}>
				{#if editMode}
					<button
						type="button"
						class="border border-green-500 rounded-sm px-4 text-sm"
						on:click={() => {
							const id = saveQuest(quest);
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
					deleteQuest(quest.id);
					deleteWarning = false;
					goto(`/campaigns/`);
				}}
			/>
		</div>
	</Toolbar>
	{#if quest !== undefined}
		{#if wikiView}
			<QuestWiki {editMode} {quest} />
		{/if}
	{/if}
</PageLayout>
