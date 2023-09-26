<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import NavMenu from '../../components/nav/NavMenu.svelte';
	import { getCampaign, getQuests, getSessions } from '../../utilities/helpers/campaignHelper';

	const quests = getQuests();
	let filteredQuests = quests;

	export let data;
</script>

<PageLayout windowTitle="Quests">
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-8">Quests</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={filteredQuests}
				columns={[
					{ title: 'id', labelAccesor: (v) => v.id },
					{ title: 'name', labelAccesor: (v) => v.name, linkAccessor: (v) => `/quests/${v.id}` }
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
							goto('quests/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No quests found. Create a new quests to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
