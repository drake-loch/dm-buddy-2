<script lang="ts">
	import { newEmptyCharacter, type Character } from '../../../utilities/helpers/charHelper';
	import { newEmptyNPC, type NPC } from '../../../utilities/helpers/npcHelper/npcHelper';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiPanelBoolValue from './components/WikiPanelBoolValue.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';
	import WikiPanelTitle from './components/WikiPanelTitle.svelte';
	import WikiStats from './components/WikiStats.svelte';

	export let editMode = false;
	export let char: Character = newEmptyCharacter();
	export let save: (char: Character) => number;
</script>

<WikiPage title={char.fullName} type={`${char.gender} ${char.race}`}>
	<div slot="wikiPanel" class="w-full">
		<hr />
		<!-- combat details -->
		<WikiPanelSection>
			<WikiPanelKeyValue {editMode} label="Armour Class:" bind:value={char.armorClass} />
			<WikiPanelKeyValue {editMode} label="Hit Points:" bind:value={char.hitPoints} />
			<WikiPanelKeyValue {editMode} label="Speed:" bind:value={char.speed} />
		</WikiPanelSection>

		<WikiPanelSection>
			<WikiStats {editMode} bind:stats={char.stats} />
		</WikiPanelSection>

		<!-- Bio -->
		<WikiPanelSection>
			<WikiPanelKeyValue {editMode} label="Name:" bind:value={char.fullName} />
			<WikiPanelKeyValue {editMode} label="Age:" bind:value={char.age} />
			<WikiPanelKeyValue {editMode} label="Race:" bind:value={char.race} />
			<WikiPanelKeyValue {editMode} label="Class:" bind:value={char.class} />
			<WikiPanelKeyValue {editMode} label="Background:" bind:value={char.background} />
		</WikiPanelSection>

		<!-- Features -->
		<WikiPanelSection removeBorder _class="space-y-4">
			{#each char.features as feature}
				<WikiPanelKeyValue {editMode} label={feature.title} bind:value={feature.desc} textarea />
			{/each}
		</WikiPanelSection>

		<WikiPanelSection removeBorder _class="space-y-4">
			<WikiPanelTitle title="Characteristics" />
			<WikiPanelKeyValue
				{editMode}
				label="Personality Traits"
				bind:value={char.characteristics.personalityTraits}
				textarea
			/>
			<WikiPanelKeyValue
				{editMode}
				label="Ideals"
				bind:value={char.characteristics.ideals}
				textarea
			/>
			<WikiPanelKeyValue
				{editMode}
				label="Bonds"
				bind:value={char.characteristics.bonds}
				textarea
			/>
			<WikiPanelKeyValue
				{editMode}
				label="Flaws"
				bind:value={char.characteristics.flaws}
				textarea
			/>
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
							char.additionalInfo = [
								...char.additionalInfo,
								{
									title: 'New Info',
									data: ''
								}
							];
							char.additionalInfo = char.additionalInfo;
						}}>+ Add</button
					>
				{/if}
			</div>
			{#each char.additionalInfo as info}
				<span class="mb-2 w-full">
					<WikiEntry
						{editMode}
						save={() => {
							save(char);
						}}
						bind:title={info.title}
						bind:data={info.data}
					/>
				</span>
			{/each}
		</div>
		<span class="mb-2 w-full">
			<WikiEntry
				{editMode}
				titleEditable={false}
				save={() => {
					save(char);
				}}
				title="Notes"
				bind:data={char.notes}
				placeholder="Notes"
			/>
		</span>
	</div>
</WikiPage>
