<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import PromptTool from '../../../components/common/PromptTool/PromptTool.svelte';
	import { goto } from '$app/navigation';
	import { generateRandomSettlementPrompt } from '../../../utilities/helpers/promptHelper';
	import PlacePage from '../../../components/common/wiki/pages/PlacePage.svelte';
	import {
		getPlace,
		handlePlacePrompt,
		newPlace,
		savePlace
	} from '../../../utilities/helpers/placeHelper';
	import NavMenu from '../../../components/nav/NavMenu.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';

	export let data;

	const FORM_NAME = 'place-form';

	const parentPlaceId = data?.ppid ?? undefined;

	let place = getPlace(+data.id) ?? newPlace();

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let promptInput = '';
	console.log('place: ', place);

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		place.name = values.name.toString();
		place.type = values.type.toString();
		place.imageUrl = values.imageUrl.toString();
		place.size = values.size.toString();
		place.population = +values.population.toString();
		place.description = values.description.toString();
		place.notes = values.notes.toString();
		place.quests = place.quests.filter((q) => q > 0);
		place.organizations = place.organizations.filter((o) => o > 0);
		place.authorityFigures = place.authorityFigures.filter((a) =>
			a.id ? a.id > 0 : a.name !== ''
		);
		place.places = place.places.filter((p) => p > 0);

		console.log('place: ', place);

		// const id = savePlace(place);
		// if (isNew) {
		// 	goto(`/places/${id}`);
		// }
		editing = false;
	};
</script>

<svelte:head>
	<title>Place - {isNew ? 'New Place' : place.name}</title>
</svelte:head>

<PageLayout>
	<div
		slot="sidebar"
		class="md:space-y-2 py-2 px-2 md:p-0 flex flex-row-reverse md:block justify-between items-center"
	>
		<NavMenu />
		<ToolbarIi
			bind:promptInput
			formName={FORM_NAME}
			bind:editing
			handleGenerate={() => {
				promptInput = generateRandomSettlementPrompt(place);
			}}
			handleApply={() => {
				place = handlePlacePrompt(place, promptInput);
				place = place;
			}}
		/>
	</div>
	{#if place !== undefined}
		<PlacePage {place} {editing} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
