<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import { deletePlace, getPlace, getPlaces } from '../../utilities/helpers/placeHelper';

	const places = getPlaces();

	export let data;

	const placeId = data?.ppid ?? undefined;

	let placesList = places.map((s) => {
		return {
			name: { value: s.name, link: `/places/${s.id}` },
			id: { value: `${s.id}` },
			type: { value: s.type }
		};
	});
	if (placeId !== undefined) {
		const settlement = getPlace(+placeId);
		if (settlement) {
			const placeIdsInSettlement = settlement.places.concat(+placeId);
			placesList = placesList.filter((s) => {
				return placeIdsInSettlement.includes(+s.id.value);
			});
		}
		console.log('settlement: ', settlement);
	}
</script>

<PageLayout>
	<Toolbar>
		{#if !placeId}
			<button
				on:click={() => {
					goto('places/new');
				}}
				type="button"
				class="
        border border-green-500 rounded-md w-full hover:bg-green-400">Add</button
			>
		{:else}
			<button
				on:click={() => {
					goto(`places/new?ppid=${placeId}`);
				}}
				type="button"
				class="
        border border-green-500 rounded-md w-full hover:bg-green-400">Add to Place</button
			>
		{/if}
		<div class="w-full h-full px-2" slot="mobile-tools">
			<div class={`w-full h-full flex items-center gap-2`}>
				<button
					type="button"
					class="border border-green-500 rounded-sm px-4 text-sm"
					on:click={() => {
						goto('places/new');
					}}>New Place</button
				>
			</div>
		</div>
	</Toolbar>
	<div class="w-full p-2 md:p-0 md:w-3/4 overflow-hidden">
		<h1 class="text-3xl mb-12">Settlements, Esablishments and Points of Intrest</h1>
		<div class="w-full flex justify-center">
			<Table headers={['id', 'Name', 'Type']} rows={placesList} _class="w-full md:w-1/2">
				<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
					<button
						type="button"
						on:click={() => {
							placesList = deletePlace(+row.id.value).map((s) => {
								return {
									name: { value: s.name, link: `/places/${s.id}` },
									id: { value: `${s.id}` },
									type: { value: s.type }
								};
							});
							placesList = placesList;
						}}
						class="bg-red-600 px-2 rounded-md hover:bg-red-400"
					>
						Delete
					</button>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
