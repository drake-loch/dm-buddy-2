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
	</Toolbar>
	<div class="w-3/4 overflow-hidden">
		<h1 class="text-3xl">Characters</h1>
		<!-- table -->
		<div class="w-full flex justify-center">
			<Table headers={['id', 'Name', 'Race']} rows={chars} _class="w-1/2">
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

<!-- 
	<div class="flex w-full justify-center items-center h-full">
			<div class="flex flex-col w-1/2 border-2 p-2 h-[30rem] gap-1">
				{#each chars as char}
					<a class="bg-gray-300 text-center hover:bg-gray-400" href={`characters/${char.id}`}
						>{char.fullName}</a
					>
				{/each}
			</div>
 -->
