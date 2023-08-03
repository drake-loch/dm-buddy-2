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
	import WikiPanelSelect from './components/WikiPanelSelect.svelte';
	import WikiPanelTitle from './components/WikiPanelTitle.svelte';

	export let editMode = false;
	export let settlement: Settlement = newSettlement();
	export let save: (settlement: Settlement) => number = () => saveSettlement(settlement);

	const people = getNPCs().map((c) => {
		return {
			value: { id: c.id, type: c.type },
			label: c.fullName,
			action: () => {
				//view character
				// toggleMod('npc', c.id);
			}
		};
	});
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
		'Point of Interest',
		'Continent'
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

			<WikiPanelKeyValue {editMode} label="Economy:" bind:value={settlement.economy} />
			<WikiPanelKeyValue {editMode} label="Languages:" bind:value={settlement.languages} />
			<WikiMultiSelect
				{editMode}
				label="Organizations:"
				bind:values={settlement.organizations}
				options={[]}
			/>
		</WikiPanelSection>

		{#if settlement.authorityFigures.length > 0 || editMode}
			<WikiPanelSection>
				<WikiPanelTitle title="Authority Figures" />
				<div class="flex flex-col gap-2 items-center">
					{#each settlement.authorityFigures as authFigure, i}
						<div class="flex w-full items-center gap-2">
							{#if editMode}
								{#if authFigure.isLinked}
									<span class="w-1/3">
										<WikiPanelSelect
											label="Person:"
											bind:value={authFigure}
											options={people}
											{editMode}
										/>
									</span>
								{:else}
									<span class="w-1/3">
										<WikiPanelKeyValue
											label="Person:"
											{editMode}
											bind:value={authFigure.name}
											valueClass="text-black font-semibold"
										/>
									</span>
								{/if}
								<span class="w-1/3">
									<WikiPanelKeyValue
										label="Role:"
										{editMode}
										bind:value={authFigure.role}
										valueClass="text-black font-semibold"
									/>
								</span>
							{:else}
								{#if authFigure.role}
									<label
										for={`${authFigure.id}-${authFigure.type}-label`}
										class="text-black font-semibold text-sm"
										>{authFigure.role}:
									</label>
								{/if}
								{#if authFigure.isLinked}
									<a href={`/npcs/${authFigure.id}`} class="text-blue-400 text-sm underline"
										>{people.find((p) => p.value.id === authFigure.id)?.label}</a
									>
								{:else}
									<span class="text-white text-sm">{authFigure.name}</span>
								{/if}
							{/if}

							{#if editMode}
								<input
									type="checkbox"
									name={`toggled-${i}`}
									id=""
									checked={authFigure.isLinked}
									on:change={(e) => {
										// @ts-ignore
										authFigure.isLinked = e.target.checked;
									}}
								/>
								<button
									type="button"
									class="bg-red-600 w-6 h-6"
									on:click={() => {
										settlement.authorityFigures = settlement.authorityFigures.filter(
											(a) => a !== authFigure
										);
										settlement = settlement;
									}}>🗑️</button
								>
							{/if}
						</div>
					{/each}
				</div>
				<div class="flex items-center w-full mt-2">
					{#if editMode}
						<button
							type="button"
							class="bg-green-600 w-4 h-4 rounded-full flex justify-center items-center pb-1"
							on:click={() => {
								settlement.authorityFigures = [
									...settlement.authorityFigures,
									{ id: -1, type: 'npc', role: '', isLinked: false }
								];
								settlement = settlement;
							}}>+</button
						>
					{/if}
				</div>
			</WikiPanelSection>
		{/if}

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
