<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Sidebar from '../../components/toolbar/Sidebar.svelte';
	import { getOrgs } from '../../utilities/helpers/orgHelper';

	const orgs = getOrgs();

	let orgList = orgs.map((org) => {
		return {
			name: { value: org.name, link: `/organizations/${org.id}` },
			id: { value: `${org.id}` },
			leader: { value: org.leaders[0]?.name ?? '---' }
		};
	});
</script>

<PageLayout>
	<Sidebar>
		<div class="w-full h-full px-2" slot="custom">
			<div class="w-full h-full flex items-center md:items-start gap-2">
				<button
					type="button"
					class="border border-green-500 rounded-sm px-4 text-sm"
					on:click={() => {
						goto('organizations/new');
					}}>New</button
				>
			</div>
		</div>
	</Sidebar>

	<div class="w-full p-2 md:px-0 md:w-3/4 overflow-hidden">
		<h1 class="text-3xl mb-2">Organizations</h1>
		<div class="w-full flex justify-center">
			<Table headers={['id', 'Name', 'Leader']} rows={orgList} _class="w-full md:w-1/2">
				<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
					<button
						type="button"
						on:click={() => {
							// npcList = deleteNPC(+row.id.value).map((npc) => {
							// 	return {
							// 		name: { value: npc.fullName, link: `/npcs/${npc.id}` },
							// 		id: { value: `${npc.id}` },
							// 		race: { value: npc.race }
							// 	};
							// });
							// npcList = npcList;
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
