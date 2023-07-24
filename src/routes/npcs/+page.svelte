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
		<div class="w-full h-full px-2" slot="mobile-tools">
			<div class={`w-full h-full flex items-center gap-2`}>
				<button
					type="button"
					class="border border-green-500 rounded-sm px-4 text-sm"
					on:click={() => {
						goto('npcs/new');
					}}>New NPC</button
				>
			</div>
		</div>
	</Toolbar>
	<div class="w-full p-2 md:px-0 md:w-3/4 overflow-hidden">
		<h1 class="text-3xl mb-2">NPCs</h1>
		<div class="w-full flex justify-center">
			<Table headers={['id', 'Name', 'Race']} rows={npcList} _class="w-full md:w-1/2">
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
