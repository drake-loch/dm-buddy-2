<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import { deleteNPC, getNPCs } from '../../utilities/helpers/dataManager';

	const npcs = getNPCs();

	let npcList = npcs.map((npc) => {
		return {
			name: { value: npc.fullName, link: `/npcs/${npc.id}` },
			id: { value: `${npc.id}` },
			race: { value: npc.race }
		};
	});
</script>

<PageLayout>
	<Toolbar>
		<button
			on:click={() => {
				goto('npcs/new');
			}}
			type="button"
			class="
        border border-green-500 rounded-md w-full hover:bg-green-400">Add</button
		>
	</Toolbar>
	<div class="w-3/4 overflow-hidden">
		<h1 class="text-3xl">NPCs</h1>
		<div class="w-full flex justify-center">
			<Table headers={['id', 'Name', 'Race']} rows={npcList} _class="w-1/2">
				<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
					<button
						type="button"
						on:click={() => {
							npcList = deleteNPC(+row.id.value).map((npc) => {
								return {
									name: { value: npc.fullName, link: `/npcs/${npc.id}` },
									id: { value: `${npc.id}` },
									race: { value: npc.race }
								};
							});
							npcList = npcList;
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
