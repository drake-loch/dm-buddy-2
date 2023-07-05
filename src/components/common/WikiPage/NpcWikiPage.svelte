<script lang="ts">
	import { newEmptyNPC, type NPC } from '../../../utilities/helpers/npcHelper/npcHelper';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiPanelBoolValue from './components/WikiPanelBoolValue.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';
	import WikiPanelTitle from './components/WikiPanelTitle.svelte';
	import WikiStats from './components/WikiStats.svelte';

	export let editMode = false;
	export let npc: NPC = newEmptyNPC();
	export let save: (npc: NPC) => number;
</script>

<WikiPage title={npc.fullName} type={npc.type}>
	<div slot="wikiPanel" class="w-full">
		<WikiPanelSection>
			<WikiStats {editMode} bind:stats={npc.stats} />
		</WikiPanelSection>

		<!-- Bio -->
		<WikiPanelSection>
			<slot name="bio" />
			<WikiPanelKeyValue {editMode} label="Name:" bind:value={npc.fullName} />
			<WikiPanelKeyValue {editMode} label="Age:" bind:value={npc.age} />
			<WikiPanelKeyValue {editMode} label="Race:" bind:value={npc.race} />
			<WikiPanelKeyValue {editMode} label="Occupation:" bind:value={npc.occupation} />
			<WikiPanelBoolValue editMode={false} label="Quest:" checked={npc.quests.length > 0} />
		</WikiPanelSection>

		<!-- Features -->
		<WikiPanelSection removeBorder _class="space-y-4">
			<slot name="features" />
			{#each npc.features as feature}
				<WikiPanelKeyValue {editMode} label={feature.title} bind:value={feature.desc} textarea />
			{/each}
		</WikiPanelSection>

		<!-- Actions -->
		<WikiPanelSection removeBorder={npc.actions.length <= 0}>
			<slot name="actions" />
			<WikiPanelTitle title="Actions" />
			{#each npc.actions as action}
				<WikiPanelKeyValue {editMode} label={action.title} bind:value={action.desc} textarea />
			{/each}
		</WikiPanelSection>

		<!-- roleplaying Notes -->
		<WikiPanelSection removeBorder={npc.rpNotes.length <= 0}>
			<slot name="roleplayingNotes" />
			<WikiPanelTitle title="Roleplaying Notes" />
			<WikiPanelKeyValue {editMode} label="" bind:value={npc.rpNotes} textarea />
		</WikiPanelSection>
	</div>
	<div class="" slot="wiki">
		<!-- Additional Info -->
		<div class="w-full">
			<div class="mb-4">
				{#if editMode}
					<button
						type="button"
						class="bg-blue-500 px-2 py-0.5 rounded-md border"
						on:click={() => {
							npc.quests.push({ title: '', data: '', rewards: [] });
							npc.quests = [...npc.quests];
							console.log(npc.quests);
						}}>+ Add</button
					>
				{/if}
			</div>
			{#each npc.additionalInfo as info}
				<span class="mb-2 w-full">
					<WikiEntry
						{editMode}
						deleteModule={() => {
							console.log('delete');
						}}
						bind:title={info.title}
						bind:data={info.data}
					/>
				</span>
			{/each}
		</div>
		<!-- Quests -->
		{#if npc.quests.length > 0 || editMode}
			<div class="w-full">
				<h1 class="text-2xl border-b mb-2">Quests</h1>
				<div class="mb-4">
					{#if editMode}
						<button
							type="button"
							class="bg-blue-500 px-2 py-0.5 rounded-md border"
							on:click={() => {
								npc.quests.push({ title: '', data: '', rewards: [] });
								npc.quests = [...npc.quests];
								console.log(npc.quests);
							}}>+ Add</button
						>
					{/if}
				</div>
				{#each npc.quests as quest}
					<span class="mb-2 w-full">
						<WikiEntry
							{editMode}
							deleteModule={() => {
								console.log('delete');
							}}
							bind:title={quest.title}
							bind:data={quest.data}
						/>
					</span>
				{/each}
			</div>
		{/if}
		<span class="mb-2 w-full">
			<WikiEntry
				{editMode}
				titleEditable={false}
				save={() => save(npc)}
				title="Notes"
				bind:data={npc.notes}
				placeholder="Notes"
			/>
		</span>
	</div>
</WikiPage>
