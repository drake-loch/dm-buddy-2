<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import NavMenu from '../../components/nav/NavMenu.svelte';
	import { getCampaign, getSessions } from '../../utilities/helpers/campaignHelper';

	const sessions = getSessions();
	let filteredSessions = sessions;

	export let data;

	const campaignId = data?.cid ?? undefined;

	if (campaignId !== undefined) {
		const campaign = getCampaign(+campaignId);
		if (campaign) {
			filteredSessions = sessions.filter((p) => {
				return campaign.sessions.includes(p.id);
			});
		}
	}
</script>

<PageLayout>
	<NavMenu />
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-12">Settlements, Esablishments and Points of Intrest</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={filteredSessions}
				columns={[
					{ title: 'id', labelAccesor: (v) => v.id },
					{ title: 'name', labelAccesor: (v) => v.name, linkAccessor: (v) => `/sessions/${v.id}` },
					{ title: 'Created', labelAccesor: (v) => v.createdDate }
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
							goto('sessions/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No sessions found. Create a new session to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
