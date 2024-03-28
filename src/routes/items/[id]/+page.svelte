<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import ItemPage from '../../../components/common/wiki/pages/ItemPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import { getItem, newItem, saveItem } from '../../../utilities/helpers/placeHelper';

	export let data;

	const FORM_NAME = 'lore-form';

	let item = getItem(+data.id) ?? newItem();

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let promptInput = '';

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		item.name = values.name.toString();
		// item type will be a string seperated by commas, so we need to split it into an array
		item.type = values.type.toString().split(',');

		const id = saveItem(item);
		if (isNew) {
			goto(`/items/${id}`);
		}
		editing = false;
	};
</script>

<svelte:head>
	<title>Item - {isNew ? 'New Item' : item.name}</title>
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
			//
		}}
	/>
	{#if item !== undefined}
		<!-- <LorePage {lore} {editing} {submit} name={FORM_NAME} /> -->
		<ItemPage {item} {editing} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
