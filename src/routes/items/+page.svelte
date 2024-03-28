<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import Textarea from '../../components/form/textarea/Textarea.svelte';
	import { getItems, getRawItemList, parseRawItemList } from '../../utilities/helpers/placeHelper';

	let items = getItems();

	export let data;

	let isImportingItems = false;

	let rawItemList = getRawItemList();
</script>

<PageLayout windowTitle="Lore">
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-8">Items</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<Table
				data={items}
				columns={[
					{ title: 'id', labelAccesor: (p) => p.id },
					{ title: 'name', labelAccesor: (p) => p.name, linkAccessor: (p) => `/items/${p.id}` },
					{ title: 'type', labelAccesor: (p) => p.type.join(', ') }
				]}
				searchAccessor={(v) => v.name}
			>
				<div class="w-full" slot="tools">
					<div class="mb-2">
						<Button
							text="New"
							type="secondary"
							size="small"
							colour="green"
							click={() => {
								goto('items/new');
							}}
						/>
						<Button
							text={isImportingItems ? 'Cancel' : 'Import List'}
							type="secondary"
							size="small"
							colour="purple"
							click={() => {
								isImportingItems = !isImportingItems;
							}}
						/>
					</div>
				</div>

				<div class="w-full" slot="additionalTools">
					{#if isImportingItems}
						<div class="w-full flex flex-col gap-2">
							<Textarea
								bind:value={rawItemList}
								label={''}
								name={'raw-item-list'}
								editMode
								_class="w-full"
							/>
							<Button
								text="Import"
								type="secondary"
								size="small"
								colour="green"
								click={() => {
									parseRawItemList(rawItemList);
									isImportingItems = false;
									items = getItems();
								}}
							/>
						</div>
					{/if}
				</div>
				<div class="w-full min-h-[10rem] flex justify-center items-center" slot="emptyState">
					<p>No items found. Create new items to get started.</p>
				</div>
			</Table>
		</div>
	</div>
</PageLayout>
