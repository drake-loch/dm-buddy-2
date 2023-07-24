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
	import WikiSettlement from '../../../components/common/wiki/WikiSettlement.svelte';

	export let data;

	let settlement = getSettlement(+data.id) ?? newSettlement();

	let editMode = Number.isNaN(data.id) ?? false;
	// let editMode = true;
	let promptInput = '';
	let wikiView = true;

	const getControlGroup = (values: { [k: string]: FormDataEntryValue }, formGroupName: string) => {
		// const group = Object.entries(values).filter(([key, value]) => {
		// 	return key.includes(formGroupName);
		// });
		// group.forEach((g) => {
		// 	g.forEach((v) => {
		// 		groupKey
		// 	});
		// })
		// console.log('Group: ', group);
	};

	const submit = (form: any) => {
		form.preventDefault();
		console.log('auth figures', settlement.authorityFigures);

		const values = Object.fromEntries(new FormData(form.target));
		// console.log(new FormData(form.target));
		console.log(values);
		getControlGroup(values, 'authorityFigures');
		//authority Figures have a key that begins with a double quote like this: "authorityFigures[0]", so extract those values
		// const authorityFigures = Object.entries(values).filter(([key, value]) => {
		// 	const authFig = key.includes('authorityFigures');
		// 	console.log('_auth ', authFig);
		// 	return authFig;
		// });
		// console.log('Figures: ', authorityFigures);
		// authorityFigures.forEach(([key, value]) => {
		// 	const index = key.match(/\d+/g)?.[0];
		// 	const group = authorityFigures.filter(([k, v]) => k.includes(`authorityFigures[${index}]`));
		// 	console.log('group: ', group);

		// 	if (group.length > 1 && index !== undefined) {
		// 		const figure = settlement.authorityFigures.find((f) => f.id === +index + 1);
		// 		console.log('figure: ', figure);
		// 	}
		// });
	};
</script>

<PageLayout>
	<Toolbar>
		<div class="mb-4 w-full flex flex-col gap-2">
			{#if editMode}
				<!-- <button
					type="submit"
					class="border border-green-500 rounded-sm px-4"
					form="formTest"
					on:click={() => {
						const id = saveSettlement(settlement);
						goto(`/settlements/${id}`);
						editMode = !editMode;
					}}>Save Settlement</button
				> -->
				<button
					type="submit"
					class="border border-green-500 rounded-sm px-4 text-sm"
					form="formTest">Save</button
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

		<div class="w-full h-full px-2" slot="mobile-tools">
			<div class={`w-full h-full flex items-center gap-2 ${editMode ? 'mb-4' : ''}`}>
				{#if editMode}
					<button
						type="button"
						class="border border-green-500 rounded-sm px-4 text-sm"
						form="formTest">Save</button
					>
					<button type="button" class="border border-red-500 rounded-sm px-4 text-sm">Delete</button
					>
					<button
						type="button"
						class="border border-gray-200 rounded-sm px-4 text-sm"
						on:click={() => {
							editMode = !editMode;
						}}>Cancel</button
					>
				{:else}
					<button
						type="button"
						class="border border-blue-500 rounded-sm px-4 text-sm"
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
		</div>
	</Toolbar>
	{#if settlement !== undefined}
		<SettlementWiki {settlement} {editMode} />
		<!-- <WikiSettlement {settlement} {editMode} {submit} name="formTest" /> -->
	{/if}
</PageLayout>
