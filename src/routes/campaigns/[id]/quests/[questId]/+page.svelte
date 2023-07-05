<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../../../components/common/PageLayout/PageLayout.svelte';
	import QuestWiki from '../../../../../components/common/WikiPage/QuestWiki.svelte';
	import Toolbar from '../../../../../components/toolbar/Toolbar.svelte';
	import {
		addQuestToCampaign,
		getQuest,
		newQuest,
		saveQuest
	} from '../../../../../utilities/helpers/campaignHelper';

	export let data;

	console.log(data);

	let quest = getQuest(+data.questId) ?? newQuest();

	let editMode = Number.isNaN(data.questId) ?? false;
	let isNew = Number.isNaN(data.questId) ?? false;

	console.log(isNew);

	// let promptInput = '';
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
	</Toolbar>
	{#if quest !== undefined}
		{#if wikiView}
			<QuestWiki {editMode} {quest} />
		{/if}
	{/if}
</PageLayout>
