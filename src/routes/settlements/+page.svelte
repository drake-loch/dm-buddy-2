<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import { deleteSettlement, getSettlements } from '../../utilities/helpers/settlementHelper';

	const settlements = getSettlements();

	let settlementList = settlements.map((s) => {
		return {
			name: { value: s.name, link: `/settlements/${s.id}` },
			id: { value: `${s.id}` },
			type: { value: s.type }
		};
	});
</script>

<PageLayout>
	<Toolbar>
		<button
			on:click={() => {
				goto('settlements/new');
			}}
			type="button"
			class="
        border border-green-500 rounded-md w-full hover:bg-green-400">Add</button
		>
	</Toolbar>
	<div class="w-3/4 overflow-hidden">
		<h1 class="text-3xl mb-12">Settlements, Esablishments and Points of Intrest</h1>
		<div class="w-full flex justify-center">
			<Table headers={['id', 'Name', 'Type']} rows={settlementList} _class="w-1/2">
				<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
					<button
						type="button"
						on:click={() => {
							settlementList = deleteSettlement(+row.id.value).map((s) => {
								return {
									name: { value: s.name, link: `/settlements/${s.id}` },
									id: { value: `${s.id}` },
									type: { value: s.type }
								};
							});
							settlementList = settlementList;
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
