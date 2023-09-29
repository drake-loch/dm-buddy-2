<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import { getNPCs } from '../../utilities/helpers/dataManager';

	const npcs = getNPCs();
</script>

<PageLayout>
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-12">NPCs</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={npcs}
				maxItems={10}
				columns={[
					{ title: 'id', labelAccesor: (v) => v.id },
					{
						title: 'name',
						labelAccesor: (v) => v.fullName,
						linkAccessor: (v) => `/npcs/${v.id}`
					}
				]}
				searchAccessor={(v) => v.fullName}
			>
				<div class="" slot="tools">
					<Button
						text="New"
						type="secondary"
						size="small"
						colour="green"
						click={() => {
							goto('npcs/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No NPCs found. Create a new NPC to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
