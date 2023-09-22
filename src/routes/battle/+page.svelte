<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Select from '../../components/form/select/Select.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import {
		deleteCharacter,
		getCharacters,
		getNPCs,
		getNPCsAndChars
	} from '../../utilities/helpers/dataManager';

	type BattlePawn = {
		id: number;
		name: string;
		initiative: number;
		hp: number;
		ac: number;
		speed: number;
		actions: string[];
		reactions: string[];
		legendaryActions: string[];
		imageUrl: string;
	};

	const MONSTERS = [
		{
			type: 'goblin',
			name: 'Goblin',
			id: 1
		},
		{
			type: 'skeleton',
			name: 'Skeleton',
			id: 2
		}
	];

	// let chars = getCharacters().map((char) => {
	// 	return {
	// 		name: { value: char.fullName, link: `/characters/${char.id}` },
	// 		race: { value: char.race },
	// 		id: { value: `${char.id}` }
	// 	};
	// });
	const players = getCharacters();
	const monsters = MONSTERS;

	let activePlayerIds: number[] = [];
	let activeMonsterIds: number[] = [];

	let playerEntities: BattlePawn[] = [];

	$: {
		playerEntities = players
			.filter((p) => activePlayerIds.includes(p.id))
			.map((p) => {
				return {
					id: p.id,
					name: p.fullName,
					initiative: 0,
					hp: 0,
					ac: 0,
					speed: 0,
					actions: [],
					reactions: [],
					legendaryActions: [],
					imageUrl: p.imageUrl ?? ''
				};
			});
	}
</script>

<svelte:head>
	<title>Battles</title>
</svelte:head>

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

	<div class="w-full bg-gray-500 min-h-[10rem] px-2">
		<h1 class="bold text-2xl">Battles</h1>

		<h4>Select Players:</h4>
		<span class="w-1/2">
			<Select
				editMode={true}
				label="Players: "
				options={players.map((c) => {
					return {
						value: c.id,
						label: c.fullName,
						action: () => {
							//view character
							// toggleMod(c.id);
						}
					};
				}) ?? []}
				bind:values={activePlayerIds}
			/>
		</span>

		<h4>Select Monsters:</h4>
		<span class="w-1/2">
			<Select
				editMode={true}
				label="Monsters: "
				options={monsters.map((c) => {
					return {
						value: c.id,
						label: c.name,
						action: () => {
							//view character
							// toggleMod(c.id);
							console.log('selected monster', c);
						}
					};
				}) ?? []}
				bind:values={activeMonsterIds}
			/>
		</span>

		<h4>Players:</h4>

		<div class="flex">
			{#each playerEntities as player}
				<!-- <span class="w-6 h-6 bg-gray-800"> -->
				<img src={player.imageUrl} alt={`player-${player.name}-art`} class="w-20 h-20" />
				<!-- </span> -->
			{/each}
		</div>
		<h4>Monsters:</h4>

		<div class="flex">
			{#each playerEntities as player}
				<!-- <span class="w-6 h-6 bg-gray-800"> -->
				<img src={player.imageUrl} alt={`player-${player.name}-art`} class="w-20 h-20" />
				<!-- </span> -->
			{/each}
		</div>
	</div>
</PageLayout>
