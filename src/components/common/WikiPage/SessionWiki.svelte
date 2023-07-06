<script lang="ts">
	import {
		newQuest,
		saveQuest,
		type Quest,
		newSession,
		saveSession,
		type Session
	} from '../../../utilities/helpers/campaignHelper';
	import { getCharacters, getNPCs } from '../../../utilities/helpers/dataManager';
	import Select from '../../form/select/Select.svelte';

	import Table from '../Table/Table.svelte';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';
	import WikiMultiSelect from './components/WikiMultiSelect.svelte';
	import WikiPanelKeyValue from './components/WikiPanelKeyValue.svelte';
	import WikiPanelSection from './components/WikiPanelSection.svelte';

	export let editMode = false;
	export let session = newSession();
	export let toggleMod: (type: string, id: number) => void = () => {};

	export let save: (session: Session) => number = () => saveSession(session);

	const players = getCharacters().map((c) => {
		return {
			value: c.id,
			label: c.fullName,
			action: () => {
				//view character
				toggleMod('character', c.id);
			}
		};
	});
	const npcs = getNPCs().map((c) => {
		return {
			value: c.id,
			label: c.fullName,
			action: () => {
				//view character
				toggleMod('npc', c.id);
			}
		};
	});
</script>

<WikiPage
	{editMode}
	bind:title={session.name}
	type="Session"
	staticType
	bind:additionalInfo={session.additionalInfo}
>
	<div slot="wikiPanel" class="w-full">
		<hr />

		<WikiPanelSection>
			<Select
				{editMode}
				label="Players:"
				bind:values={session.characters}
				options={players ?? []}
			/>
			<Select {editMode} label="NPCs:" bind:values={session.npcs} options={npcs ?? []} />
		</WikiPanelSection>
	</div>

	<div class="" slot="wiki">
		<span class="mb-2 w-full">
			<WikiEntry
				{editMode}
				titleEditable={false}
				save={() => {
					save(session);
				}}
				title="Notes"
				bind:data={session.notes}
				placeholder="Notes"
			/>
		</span>
	</div>
</WikiPage>
