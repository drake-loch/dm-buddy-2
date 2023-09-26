<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import { getCharacters } from '../../utilities/helpers/dataManager';

	let chars = getCharacters();
</script>

<PageLayout>
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-8">Characters</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={chars}
				columns={[
					{ title: 'id', labelAccesor: (v) => v.id },
					{
						title: 'name',
						labelAccesor: (v) => v.fullName,
						linkAccessor: (v) => `/characters/${v.id}`
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
							goto('characters/new');
						}}
					/>
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No characters found. Create a new character to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
