<script lang="ts">
	import { newEmptyCharacter, type Character } from '../../../utilities/helpers/charHelper';
	import { saveCharacter } from '../../../utilities/helpers/dataManager';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';
	import WikiPanelSelect from './components/WikiPanelSelect.svelte';
	import WikiPanelTitle from './components/WikiPanelTitle.svelte';
	import WikiStats from './components/WikiStats.svelte';

	export let editMode = false;
	export let char: Character = newEmptyCharacter();
	export let save: (char: Character) => void = () => saveCharacter(char);
</script>

<WikiPage
	{editMode}
	bind:title={char.fullName}
	type={`${char.gender} ${char.race}`}
	bind:imageUrl={char.imageUrl}
	hideAdditionalInfo
	staticType
>
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
			<WikiPanelKeyValue {editMode} label="Age:" bind:value={char.age} />
			<WikiPanelKeyValue {editMode} label="Race:" bind:value={char.race} />
			<WikiPanelKeyValue {editMode} label="Class:" bind:value={char.class} />
			<WikiPanelKeyValue {editMode} label="Background:" bind:value={char.background} />
			<!-- gender -->
			<WikiPanelKeyValue {editMode} label="Gender:" bind:value={char.gender} />
			<WikiPanelSelect
				{editMode}
				label="Alignment:"
				bind:value={char.alignment}
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
		</WikiPanelSection>
		<WikiPanelSection _class="space-y-4">
			<WikiPanelTitle title="Equipment" />
			{#each char.equipment as item}
				<WikiPanelKeyValue {editMode} label="Name" bind:value={item.name} />
				<WikiPanelKeyValue {editMode} label="Amount" bind:value={item.amount} />
			{/each}
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
