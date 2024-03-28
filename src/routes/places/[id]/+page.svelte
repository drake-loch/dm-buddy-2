<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import PlacePage from '../../../components/common/wiki/pages/PlacePage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import {
		getPlace,
		handlePlacePrompt,
		newPlace,
		savePlace
	} from '../../../utilities/helpers/placeHelper';
	import { generateRandomSettlementPrompt } from '../../../utilities/helpers/promptHelper';

	export let data;

	const FORM_NAME = 'place-form';

	const parentPlaceId = data?.ppid ?? undefined;

	let place = getPlace(+data.id) ?? newPlace();

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let promptInput = '';

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

		const id = savePlace(place);
		if (isNew) {
			goto(`/places/${id}`);
		}
		editing = false;
	};
</script>

<PageLayout backNav="/places" windowTitle={`Place - ${isNew ? 'New Place' : place.name}`}>
	<ToolbarIi
		slot="sidebar"
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
	{#if place !== undefined}
		<PlacePage {place} {editing} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
