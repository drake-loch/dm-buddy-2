<script lang="ts">
	import { newQuest } from '../../../utilities/helpers/campaignHelper';

	import Table from '../Table/Table.svelte';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiMultiSelect from './components/WikiMultiSelect.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';

	export let editMode = false;
	export let quest = newQuest();
</script>

<WikiPage {editMode} bind:title={quest.name} type="Quest" staticType hideAdditionalInfo>
	<div slot="wikiPanel" class="w-full">
		<hr />

		<!-- Bio -->
		<WikiPanelSection>
			<WikiPanelKeyValue {editMode} label="Rewards:" bind:value={quest.rewards} />
			<WikiPanelKeyValue {editMode} label="Order:" bind:value={quest.order} />
		</WikiPanelSection>

		<!-- Description -->
		<WikiPanelSection _class="space-y-4">
			<WikiPanelKeyValue {editMode} label="Description" bind:value={quest.description} textarea />
		</WikiPanelSection>
		<WikiPanelSection removeBorder _class="space-y-4">
			<WikiPanelKeyValue {editMode} label="Notes:" bind:value={quest.notes} textarea />
		</WikiPanelSection>
	</div>

	<div class="" slot="wiki-top">
		<div class="space-y-2 bg-gray-700 p-4 rounded-sm">
			<h2 class="text-2xl">Steps:</h2>
			{#if editMode}
				<button
					type="button"
					class="bg-blue-500 px-2 py-0.5 rounded-md border"
					on:click={() => {
						quest.steps = [...quest.steps, { title: '', description: '' }];
						quest.steps = quest.steps;
					}}>+ Add</button
				>
			{/if}
			<div class="flex flex-col gap-2">
				{#each quest.steps as step, i}
					<span class="mb-2 w-full">
						<WikiEntry
							{editMode}
							bind:title={step.title}
							bind:data={step.description}
							deleteModule={() => {
								quest.steps.splice(i, 1);
								quest.steps = quest.steps;
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</div>
</WikiPage>
