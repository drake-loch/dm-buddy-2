<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import NavMenu from '../../components/nav/NavMenu.svelte';
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

<PageLayout windowTitle="Campaigns">
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-8">Campaigns</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={campaigns}
				columns={[
					{ title: 'id', labelAccesor: (v) => v.id },
					{
						title: 'name',
						labelAccesor: (v) => v.name,
						linkAccessor: (v) => `/campaigns/${v.id}`
					}
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
							goto('campaigns/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No campaigns found. Create a new campaign to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
