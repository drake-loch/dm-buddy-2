<script lang="ts">
	import { updateNPC } from '../../../utilities/helpers/dataManager';
	import { newEmptyNPC, type NPC } from '../../../utilities/helpers/npcHelper/npcHelper';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiPanelBoolValue from './components/WikiPanelBoolValue.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';
	import WikiPanelSelect from './components/WikiPanelSelect.svelte';
	import WikiPanelTitle from './components/WikiPanelTitle.svelte';
	import WikiStats from './components/WikiStats.svelte';

	export let editMode = false;
	export let npc: NPC = newEmptyNPC();
	export let save: (npc: NPC) => number = () => updateNPC(npc);
</script>

<WikiPage
	{editMode}
	bind:title={npc.fullName}
	type={`${npc.size} ${npc.race}, ${npc.alignment}`}
	bind:imageUrl={npc.imageUrl}
	hideAdditionalInfo
	staticType
>
	<div slot="wikiPanel" class="w-full">
		<WikiPanelSection>
			<WikiStats {editMode} bind:stats={npc.stats} />
		</WikiPanelSection>

		<!-- Bio -->
		<WikiPanelSection>
			<slot name="bio" />
			<WikiPanelKeyValue {editMode} label="Age:" bind:value={npc.age} />
			<WikiPanelKeyValue {editMode} label="Race:" bind:value={npc.race} />
			<WikiPanelKeyValue {editMode} label="Gender:" bind:value={npc.gender} />
			<WikiPanelKeyValue {editMode} label="Occupation:" bind:value={npc.occupation} />
			<!-- alighnment -->
			<WikiPanelSelect
				{editMode}
				label="Alignment:"
				bind:value={npc.alignment}
				options={[
					{ label: 'Lawful Good', value: 'Lawful Good' },
					{ label: 'Neutral Good', value: 'Neutral Good' },
					{ label: 'Chaotic Good', value: 'Chaotic Good' },
					{ label: 'Lawful Neutral', value: 'Lawful Neutral' },
					{ label: 'Neutral', value: 'Neutral' },
					{ label: 'Chaotic Neutral', value: 'Chaotic Neutral' },
					{ label: 'Lawful Evil', value: 'Lawful Evil' },
					{ label: 'Neutral Evil', value: 'Neutral Evil' },
					{ label: 'Chaotic Evil', value: 'Chaotic Evil' }
				]}
			/>
			<!-- size -->
			<WikiPanelSelect
				{editMode}
				label="Size:"
				bind:value={npc.size}
				options={[
					{ label: "Tiny (2' - 4')", value: 'Tiny' },
					{ label: "Small (4' - 5')", value: 'Small' },
					{ label: "Medium (5' - 6')", value: 'Medium' },
					{ label: "Large (6' - 8')", value: 'Large' },
					{ label: "Huge (8' - 16')", value: 'Huge' },
					{ label: "Gargantuan (16' - 32')", value: 'Gargantuan' }
				]}
			/>
			<span class="w-full mt-4">
				<WikiPanelBoolValue editMode={false} label="Quest:" checked={npc.quests.length > 0} />
			</span>
		</WikiPanelSection>

		<WikiPanelSection removeBorder _class="space-y-4">
			<WikiPanelTitle title="Characteristics" />
			<WikiPanelKeyValue
				{editMode}
				label="Personality Traits"
				bind:value={npc.characteristics.personalityTraits}
				textarea
			/>
			<WikiPanelKeyValue
				{editMode}
				label="Ideals"
				bind:value={npc.characteristics.ideals}
				textarea
			/>
			<WikiPanelKeyValue {editMode} label="Bonds" bind:value={npc.characteristics.bonds} textarea />
			<WikiPanelKeyValue {editMode} label="Flaws" bind:value={npc.characteristics.flaws} textarea />
		</WikiPanelSection>

		<WikiPanelSection _class="space-y-1">
			<WikiPanelTitle title="Equipment" />
			{#each npc.equipment as item}
				{#if editMode}
					<WikiPanelKeyValue {editMode} label="Name" bind:value={item.name} />
					<WikiPanelKeyValue {editMode} label="Amount" bind:value={item.amount} />
				{:else}
					<WikiPanelKeyValue
						label={item.name}
						value={item.amount > 1 ? `x${item.amount}` : ''}
						showIfEmpty
					/>
				{/if}
			{/each}
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
			<button
				type="button"
				class="bg-green-600 px-1"
				on:click={() => {
					npc.actions.push({ title: '', desc: '' });
					npc.actions = [...npc.actions];
				}}>+ Add Action</button
			>
			{#each npc.actions as action}
				<WikiPanelKeyValue {editMode} label="Action name" bind:value={action.title} />
				<WikiPanelKeyValue
					{editMode}
					label="Action Description"
					bind:value={action.desc}
					textarea
				/>
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
						}}>+ Add</button
					>
				{/if}
			</div>
			{#each npc.additionalInfo as info}
				<span class="mb-2 w-full">
					<WikiEntry {editMode} bind:title={info.title} bind:data={info.data} />
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
							}}>+ Add</button
						>
					{/if}
				</div>
				{#each npc.quests as quest}
					<span class="mb-2 w-full">
						<WikiEntry {editMode} bind:title={quest.title} bind:data={quest.data} />
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
