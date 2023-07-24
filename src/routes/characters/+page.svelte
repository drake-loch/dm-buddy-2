<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import { deleteCharacter, getCharacters } from '../../utilities/helpers/dataManager';

	let chars = getCharacters().map((char) => {
		return {
			name: { value: char.fullName, link: `/characters/${char.id}` },
			race: { value: char.race },
			id: { value: `${char.id}` }
		};
	});
</script>

<PageLayout>
	<Toolbar>
		<button
			on:click={() => {
				goto('characters/new');
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
						goto('characters/new');
					}}>New Character</button
				>
			</div>
		</div>
	</Toolbar>
	<div class="w-full md:w-3/4 overflow-hidden px-2">
		<h1 class="text-3xl mb-2">Characters</h1>
		<!-- table -->
		<div class="w-full flex justify-center">
			<Table headers={['id', 'Name', 'Race']} rows={chars} _class="w-full md:w-1/2">
				<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
					<button
						type="button"
						on:click={() => {
							chars = deleteCharacter(+row.id.value).map((char) => {
								return {
									name: { value: char.fullName, link: `/characters/${char.id}` },
									race: { value: char.race },
									id: { value: `${char.id}` }
								};
							});
							chars = chars;
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
