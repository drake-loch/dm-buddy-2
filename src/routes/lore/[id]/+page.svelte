<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import LorePage from '../../../components/common/wiki/pages/LorePage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import {
		handleLorePromptInput,
		loadLore,
		newEmptyLore,
		saveLore
	} from '../../../utilities/helpers/loreHelper';

	export let data;

	const FORM_NAME = 'lore-form';

	let lore = loadLore(+data.id) ?? newEmptyLore();

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let promptInput = '';

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		lore.title = values.name.toString();
		lore.type = values.type.toString();
		lore.imageUrl = values.imageUrl.toString();
		lore.type = values.type.toString();
		lore.notes = values.notes.toString();

		const id = saveLore(lore);
		if (isNew) {
			goto(`/lore/${id}`);
		}
		editing = false;
	};
</script>

<svelte:head>
	<title>Lore - {isNew ? 'New Lore' : lore.title}</title>
</svelte:head>

<PageLayout>
	<ToolbarIi
		slot="sidebar"
		bind:promptInput
		formName={FORM_NAME}
		bind:editing
		handleGenerate={() => {
			// promptInput = generateRandomSettlementPrompt(place);
		}}
		handleApply={() => {
			lore = handleLorePromptInput(lore, promptInput);
			lore = lore;
		}}
	/>
	{#if lore !== undefined}
		<LorePage {lore} {editing} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
