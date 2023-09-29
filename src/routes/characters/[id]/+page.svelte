<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import {
		handleCharacterPromptInput,
		newEmptyCharacter,
		type Character
	} from '../../../utilities/helpers/charHelper';
	import {
		deleteCharacter,
		getCharacter,
		saveCharacter
	} from '../../../utilities/helpers/dataManager';
	import {
		generateQuickCharPrompt,
		generateRandomCharPrompt
	} from '../../../utilities/helpers/promptHelper';
	import { goto } from '$app/navigation';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import CharPage from '../../../components/common/wiki/pages/CharPage.svelte';

	export let data;

	const FORM_NAME = 'char-form';

	let character = getCharacter(+data.id) ?? newEmptyCharacter();

	let editing = Number.isNaN(data.id) ?? false;
	let isNew = Number.isNaN(data.id) ?? false;

	let promptInput = '';

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		character.fullName = values.name.toString();
		character.age = +values.age.toString();
		character.race = values.race.toString();
		character.gender = values.gender.toString();
		character.size = values.size.toString();
		character.alignment = values?.alignment?.toString() ?? '';
		character.class = values.class.toString();

		character.characteristics.personalityTraits = values.personalityTraits.toString();
		character.characteristics.ideals = values.ideals.toString();
		character.characteristics.bonds = values.bonds.toString();
		character.characteristics.flaws = values.flaws.toString();

		character.notes = values.notes.toString();

		const location = values?.location?.toString().trim();
		character.location = location ? +location : undefined;

		const id = saveCharacter(character);
		if (+data.id !== id) {
			goto(`/characters/${id}`);
		}
		editing = false;
	};
</script>

<PageLayout>
	<ToolbarIi
		slot="sidebar"
		formName={FORM_NAME}
		bind:editing
		bind:promptInput
		handleApply={() => {
			character = handleCharacterPromptInput(character, promptInput);
			character = character;
		}}
		handleGenerate={() => {
			promptInput = generateRandomCharPrompt(character);
		}}
		handleQuickGenerate={() => {
			promptInput = generateQuickCharPrompt(character);
		}}
	/>
	{#if character !== undefined}
		<CharPage bind:character {editing} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
