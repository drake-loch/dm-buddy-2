<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import NpcPage from '../../../components/common/wiki/pages/NpcPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import { deleteNPC, getNPC, saveNPC } from '../../../utilities/helpers/dataManager';
	import {
		newEmptyNPC,
		handleNPCPromptInput
	} from '../../../utilities/helpers/npcHelper/npcHelper';
	import {
		generateQuickNPCPrompt,
		generateRandomNPCPrompt
	} from '../../../utilities/helpers/promptHelper';

	export let data;

	const FORM_NAME = 'npc-form';

	let isNew = Number.isNaN(data.id) ?? false;
	let editing = isNew ?? false;

	let npc = getNPC(+data.id) ?? newEmptyNPC();
	console.log(npc);

	let promptInput = '';

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		npc.fullName = values.name.toString();
		npc.age = +values.age.toString();
		npc.race = values.race.toString();
		npc.gender = values.gender.toString();
		npc.size = values.size.toString();
		npc.alignment = values?.alignment?.toString() ?? '';
		npc.occupation = values.occupation.toString();

		npc.characteristics.personalityTraits = values.personalityTraits.toString();
		npc.characteristics.ideals = values.ideals.toString();
		npc.characteristics.bonds = values.bonds.toString();
		npc.characteristics.flaws = values.flaws.toString();

		npc.notes = values.notes.toString();

		const location = values?.location?.toString().trim();
		npc.location = location ? +location : undefined;

		const id = saveNPC(npc);
		if (+data.id !== id) {
			goto(`/npcs/${id}`);
		}
		editing = false;
	};

	//add delete button for npc
</script>

<PageLayout windowTitle={`NPC - ${isNew ? 'NEW' : npc.fullName}`}>
	<ToolbarIi
		slot="sidebar"
		formName={FORM_NAME}
		bind:editing
		bind:promptInput
		handleApply={() => {
			npc = handleNPCPromptInput(npc, promptInput);
			npc = npc;
		}}
		handleGenerate={() => {
			promptInput = generateRandomNPCPrompt(npc);
		}}
		handleQuickGenerate={() => {
			promptInput = generateQuickNPCPrompt(npc);
		}}
	/>
	{#if npc !== undefined}
		<NpcPage bind:npc {editing} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
