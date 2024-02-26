<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import { loadAllLore } from '../../utilities/helpers/loreHelper';

	const lore = loadAllLore();

	export let data;
</script>

<PageLayout windowTitle="Lore">
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-8">Lore, Books and World Information</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={lore}
				columns={[
					{ title: 'id', labelAccesor: (p) => p.id },
					{ title: 'name', labelAccesor: (p) => p.title, linkAccessor: (p) => `/lore/${p.id}` },
					{ title: 'type', labelAccesor: (p) => p.type }
				]}
				searchAccessor={(v) => v.title}
			>
				<div class="" slot="tools">
					<Button
						text="New"
						type="secondary"
						size="small"
						colour="green"
						click={() => {
							goto('lore/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No lore found. Create new lore to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
