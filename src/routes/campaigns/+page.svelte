<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import { deleteCampaign, getCampaigns } from '../../utilities/helpers/campaignHelper';

	const campaigns = getCampaigns();

	let campaignList = campaigns.map((c) => {
		return {
			name: { value: c.name, link: `/campaigns/${c.id}` },
			id: { value: `${c.id}` },
			quests: { value: `${c.quests.length}` },
			sessions: { value: `${c.sessions.length}` }
		};
	});
</script>

<PageLayout>
	<Toolbar>
		<button
			on:click={() => {
				goto('campaigns/new');
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
						goto('campaigns/new');
					}}>New Campaign</button
				>
			</div>
		</div>
	</Toolbar>
	<div class="w-full p-2 md:p-0 md:w-3/4 overflow-hidden">
		<h1 class="text-3xl mb-2 md:mb-12">Campaigns</h1>
		<div class="w-full flex justify-center">
			<Table
				headers={['id', 'Name', 'Quests', 'Sessions']}
				rows={campaignList}
				_class="w-full md:w-1/2"
			>
				<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
					<button
						type="button"
						on:click={() => {
							campaignList = deleteCampaign(+row.id.value).map((s) => {
								return {
									name: { value: s.name, link: `/campaigns/${s.id}` },
									id: { value: `${s.id}` },
									quests: { value: `${s.quests.length}` },
									sessions: { value: `${s.sessions.length}` }
								};
							});
							campaignList = campaignList;
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
