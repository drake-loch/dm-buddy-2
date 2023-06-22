<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import PromptTool from '../../../components/common/PromptTool/PromptTool.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { goto } from '$app/navigation';
	import {
		getSettlement,
		handleSettlementPrompt,
		newSettlement,
		saveSettlement
	} from '../../../utilities/helpers/settlementHelper';
	import SettlementWiki from '../../../components/common/WikiPage/SettlementWiki.svelte';
	import { generateRandomSettlementPrompt } from '../../../utilities/helpers/promptHelper';

	export let data;

	let settlement = getSettlement(+data.id) ?? newSettlement();

	let editMode = Number.isNaN(data.id) ?? false;
	let promptInput = '';
	let wikiView = true;
</script>

<PageLayout>
	<Toolbar>
		<div class="mb-4 w-full flex flex-col gap-2">
			<button
				type="button"
				class="border border-orange-500 rounded-sm px-4 mb-2"
				on:click={() => {
					wikiView = !wikiView;
				}}>{wikiView ? 'Sheet' : 'Wiki'}</button
			>
			{#if editMode}
				<button
					type="button"
					class="border border-green-500 rounded-sm px-4"
					on:click={() => {
						const id = saveSettlement(settlement);
						goto(`/settlements/${id}`);
						editMode = !editMode;
					}}>Save Settlement</button
				>
				<button type="button" class="border border-red-500 rounded-sm px-4"
					>Delete Settlement</button
				>
				<button
					type="button"
					class="border border-gray-200 rounded-sm px-4"
					on:click={() => {
						editMode = !editMode;
					}}>Cancel</button
				>
			{:else}
				<button
					type="button"
					class="border border-blue-500 rounded-sm px-4"
					on:click={() => {
						editMode = !editMode;
					}}>Edit</button
				>
			{/if}
		</div>

		{#if editMode}
			<PromptTool
				bind:promptInput
				handleApply={() => {
					settlement = handleSettlementPrompt(settlement, promptInput);
				}}
				handleGenerate={() => {
					promptInput = generateRandomSettlementPrompt(settlement);
				}}
			/>
		{/if}
	</Toolbar>
	{#if settlement !== undefined}
		{#if wikiView}
			<!--  -->
			<SettlementWiki {editMode} {settlement} />
		{/if}
	{/if}
</PageLayout>
