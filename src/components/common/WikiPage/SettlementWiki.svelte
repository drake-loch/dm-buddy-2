<script lang="ts">
	import {
		getCharacter,
		getNPC,
		getNPCs,
		getNPCsAndChars
	} from '../../../utilities/helpers/dataManager';
	import {
		newSettlement,
		saveSettlement,
		type Settlement
	} from '../../../utilities/helpers/settlementHelper';
	import Select from '../../form/select/Select.svelte';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiMultiSelect from './components/WikiMultiSelect.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';

	export let editMode = false;
	export let settlement: Settlement = newSettlement();
	export let save: (settlement: Settlement) => number = () => saveSettlement(settlement);

	const people = getNPCsAndChars().map((c) => {
		return {
			value: { id: c.id, type: c.type, role: '', name: c.fullName },
			label: c.fullName,
			type: c.type,
			action: () => {
				//view character
				// toggleMod('npc', c.id);
			}
		};
	});

	$: console.log(people);

	let authFigures: Settlement['authorityFigures'] = settlement.authorityFigures ?? [];
</script>

<WikiPage
	{editMode}
	bind:title={settlement.name}
	bind:type={settlement.type}
	bind:additionalInfo={settlement.additionalInfo}
	typeOptions={[
		'City',
		'Town',
		'Village',
		'Hamlet',
		'Thorp',
		'Holdfast',
		'Outpost',
		'Fort',
		'Castle',
		'Point of Interest'
	]}
>
	<div slot="wikiPanel" class="w-full">
		<hr />

		<!-- Bio -->
		<WikiPanelSection>
			<WikiPanelKeyValue {editMode} label="Size:" bind:value={settlement.size} />
			<WikiPanelKeyValue {editMode} label="Population:" bind:value={settlement.population} />
			<WikiPanelKeyValue {editMode} label="Alignment:" bind:value={settlement.alignment} />
			<WikiPanelKeyValue {editMode} label="Government:" bind:value={settlement.government} />
			<Select
				{editMode}
				label="Authority Figures:"
				bind:values={settlement.authorityFigures}
				options={people ?? []}
			/>
			<div class="flex gap-4 items-center justify-between my-4 border border-black py-2 px-1">
				{#each settlement.authorityFigures as authFigure}
					<label for="role">{people.find((p) => p.value === authFigure)?.label}</label>
					<WikiPanelKeyValue {editMode} label="Role:" bind:value={authFigure.role} />
				{/each}
			</div>
			<WikiPanelKeyValue {editMode} label="Economy:" bind:value={settlement.economy} />
			<WikiPanelKeyValue {editMode} label="Languages:" bind:value={settlement.languages} />
			<WikiMultiSelect
				{editMode}
				label="Organizations:"
				bind:values={settlement.organizations}
				options={[]}
			/>
		</WikiPanelSection>

		<!-- Description -->
		<WikiPanelSection removeBorder _class="space-y-4">
			<WikiPanelKeyValue
				{editMode}
				label="Description"
				bind:value={settlement.description}
				textarea
			/>
		</WikiPanelSection>
	</div>
	<div class="" slot="wiki">
		<span class="mb-2 w-full">
			<WikiEntry
				{editMode}
				titleEditable={false}
				save={() => save(settlement)}
				title="Notes"
				bind:data={settlement.notes}
				placeholder="Notes"
			/>
		</span>
	</div>
</WikiPage>
