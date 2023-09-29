<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
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
	}
</script>

<PageLayout windowTitle="Places">
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-8">Places, Settlements, Esablishments and Points of Interest</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={places}
				columns={[
					{ title: 'id', labelAccesor: (p) => p.id },
					{ title: 'name', labelAccesor: (p) => p.name, linkAccessor: (p) => `/places/${p.id}` }
				]}
				searchAccessor={(v) => v.name}
			>
				<div class="" slot="tools">
					<Button
						text="New"
						type="secondary"
						size="small"
						colour="green"
						click={() => {
							goto('places/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No places found. Create a new place to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
