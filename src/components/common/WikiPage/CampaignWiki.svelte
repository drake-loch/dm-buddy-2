<script lang="ts">
	import {
		newCampaign,
		type Campaign,
		deleteQuest,
		deleteSession,
		getQuests,
		saveCampaign,
		getSessions
	} from '../../../utilities/helpers/campaignHelper';
	import { getCharacter, getCharacters } from '../../../utilities/helpers/dataManager';
	import Select from '../../form/select/Select.svelte';
	import Table from '../Table/Table.svelte';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiMultiSelect from './components/WikiMultiSelect.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';

	export let editMode = false;
	export let campaign: Campaign = newCampaign();
	export let campaignId: number | undefined = undefined;
	export let toggleMod: (id: number) => void = () => {};
	export let save: (campaign: Campaign) => number = () => saveCampaign(campaign);

	const players = getCharacters().map((c) => {
		return {
			value: c.id,
			label: c.fullName,
			action: () => {
				//view character
				toggleMod(c.id);
			}
		};
	});

	$: questList = getQuests(campaignId ?? undefined)
		.map((q, i) => {
			return {
				name: { value: q.name, link: `/campaigns/${campaignId}/quests/${q.id}` },
				order: { value: `${q.order}` },
				id: { value: `${q.id}` }
			};
		})
		.sort((a, b) => {
			return +a.order.value - +b.order.value;
		});

	$: sessionList = getSessions(campaignId ?? undefined).map((s, i) => {
		return {
			name: { value: s.name, link: `/campaigns/${campaignId}/sessions/${s.id}` },
			id: { value: `${s.id}` }
		};
	});
</script>

<WikiPage
	{editMode}
	bind:title={campaign.name}
	type="Campaign"
	staticType
	bind:additionalInfo={campaign.additionalInfo}
	save={() => save(campaign)}
	bind:imageUrl={campaign.imageUrl}
>
	<div slot="wikiPanel" class="w-full">
		<hr />

		<WikiPanelSection>
			<Select
				{editMode}
				label="Players:"
				bind:values={campaign.characters}
				options={players ?? []}
			/>
		</WikiPanelSection>

		<WikiPanelSection removeBorder>
			<WikiPanelKeyValue label="Notes:" bind:value={campaign.notes} textarea showIfEmpty />
		</WikiPanelSection>
	</div>
	<div class="" slot="wiki-top">
		<div class="flex flex-col md:flex-row w-full mb-24 justify-evenly">
			<div class="w-full md:w-1/3">
				<h3 class="text-2xl mb-2">Quests</h3>
				<Table headers={['Order', 'Name']} rows={questList} _class="w-full" />
			</div>
			<div class="w-full md:w-1/3">
				<h3 class="text-2xl mb-2">Sessions</h3>
				<Table headers={['Name']} rows={sessionList} _class="w-full" />
			</div>
		</div>
	</div>
</WikiPage>
