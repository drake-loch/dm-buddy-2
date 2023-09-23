<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import PromptTool from '../../../components/common/PromptTool/PromptTool.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { goto } from '$app/navigation';
	import SettlementWiki from '../../../components/common/WikiPage/SettlementWiki.svelte';
	import { generateRandomSettlementPrompt } from '../../../utilities/helpers/promptHelper';
	import WikiSettlement from '../../../components/common/wiki/WikiSettlement.svelte';
	import PlacePage from '../../../components/common/wiki/pages/PlacePage.svelte';
	import { getPlace, newPlace, savePlace } from '../../../utilities/helpers/placeHelper';

	export let data;

	const parentPlaceId = data?.ppid ?? undefined;

	console.log('placeId: ', parentPlaceId);

	let place = getPlace(+data.id) ?? newPlace();

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let promptInput = '';
	let wikiView = true;

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		const id = savePlace(place);
		if (+data.id !== id) {
			goto(`/organizations/${id}`);
		}
	};
</script>

<PageLayout>
	<!-- <Toolbar>
		<div class="mb-4 w-full flex flex-col gap-2">
			{#if editMode}
				<button
					type="button"
					class="border border-green-500 rounded-sm px-4"
					on:click={() => {
						if (isNew) {
							const id = saveSettlement(settlement);
							if (parentPlaceId) {
								const parentPlace = getSettlement(+parentPlaceId);
								if (parentPlace) {
									parentPlace.places.push(id);
									saveSettlement(parentPlace);
								}
							}
							goto(`/places/${id}`);
						} else {
							saveSettlement(settlement);
						}
						editMode = !editMode;
					}}>Save</button
				>
				<button type="button" class="border border-red-500 rounded-sm px-4">Delete</button>
				<button type="button" class="border border-purple-500 rounded-sm px-4"
					>Add Parent Place</button
				>
				<button type="button" class="border border-purple-600 rounded-sm px-4">Add Place</button>
				<button
					type="button"
					class="border border-gray-200 rounded-sm px-4"
					on:click={() => {
						editMode = !editMode;
					}}>Cancel</button
				>
			{:else}
				<button
					type="button"
					class="border border-blue-500 rounded-sm px-4"
					on:click={() => {
						editMode = !editMode;
					}}>Edit</button
				>
			{/if}
			{#if settlement !== undefined && !editMode}
				<a href={`/places?ppid=${+data.id}`} class="border border-purple-500 rounded-sm px-4"
					>View Places</a
				>
			{/if}
		</div>

		{#if editMode}
			<PromptTool
				bind:promptInput
				handleApply={() => {
					settlement = handleSettlementPrompt(settlement, promptInput);
				}}
				handleGenerate={() => {
					promptInput = generateRandomSettlementPrompt(settlement);
				}}
			/>
		{/if}

		<div class="w-full h-full px-2" slot="mobile-tools">
			<div class={`w-full h-full flex items-center gap-2 ${editMode ? 'mb-4' : ''}`}>
				{#if editMode}
					<button
						type="button"
						class="border border-green-500 rounded-sm px-4 text-sm"
						on:click={() => {
							const id = saveSettlement(settlement);
							goto(`/places/${id}`);
							editMode = !editMode;
						}}>Save</button
					>
					<button type="button" class="border border-red-500 rounded-sm px-4 text-sm">Delete</button
					>
					<button
						type="button"
						class="border border-gray-200 rounded-sm px-4 text-sm"
						on:click={() => {
							editMode = !editMode;
						}}>Cancel</button
					>
				{:else}
					<button
						type="button"
						class="border border-blue-500 rounded-sm px-4 text-sm"
						on:click={() => {
							editMode = !editMode;
						}}>Edit</button
					>
				{/if}
			</div>
			{#if editMode}
				<PromptTool
					bind:promptInput
					handleApply={() => {
						settlement = handleSettlementPrompt(settlement, promptInput);
					}}
					handleGenerate={() => {
						promptInput = generateRandomSettlementPrompt(settlement);
					}}
				/>
			{/if}
		</div>
	</Toolbar> -->
	{#if place !== undefined}
		<!-- <SettlementWiki {settlement} {editMode} /> -->
		<!-- <WikiSettlement {settlement} {editMode} {submit} name="formTest" /> -->
		<PlacePage {place} {editing} {submit} name="formTest" />
	{/if}
</PageLayout>

<style>
	a {
		text-decoration: unset;
		color: white;
		text-align: center;
	}
</style>
