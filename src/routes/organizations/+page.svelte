<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import NavMenu from '../../components/nav/NavMenu.svelte';
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

<PageLayout windowTitle="Organizations">
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-8">Organizations</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={orgs}
				columns={[
					{ title: 'id', labelAccesor: (v) => v.id },
					{
						title: 'name',
						labelAccesor: (v) => v.name,
						linkAccessor: (v) => `/organizations/${v.id}`
					},
					{ title: 'members', labelAccesor: (v) => v.members.length }
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
							goto('organizations/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No organizations found. Create a new organization to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
