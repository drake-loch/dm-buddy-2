<script lang="ts">
	import { onMount } from 'svelte';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import {
		downloadAllData,
		downloadData,
		uploadData,
		uploadJSONFile
	} from '../../../utilities/helpers/dataManager';
	import NavMenu from '../../../components/nav/NavMenu.svelte';
	import Button from '../../../components/common/button/Button.svelte';

	const storageValues = {
		characters: 0,
		campaigns: 0,
		npcs: 0,
		settlements: 0,
		quests: 0,
		sessions: 0,
		total: 0
	};

	const localStorageSpace = function () {
		let _lsTotal = 0,
			_xLen,
			_x;
		for (_x in localStorage) {
			if (!localStorage.hasOwnProperty(_x)) {
				continue;
			}
			_xLen = (localStorage[_x].length + _x.length) * 2;
			_lsTotal += _xLen;

			const key = _x.split(':')[0] as keyof typeof storageValues;
			if (storageValues[key] !== undefined) {
				storageValues[key] = +(_xLen / 1024).toFixed(2);
			}
		}
		storageValues.total = +(_lsTotal / 1024).toFixed(2);
	};

	let browserMaxLocalStorage = 5000;

	onMount(() => {
		localStorageSpace();
	});

	let showUploader = false;

	let jsonData: any | undefined = undefined;
	let errorMessage = undefined;

	async function handleFileUpload(event: any) {
		const fileInput = event.target;
		try {
			jsonData = await uploadJSONFile(fileInput);
			errorMessage = undefined;
		} catch (error) {
			errorMessage = error;
			jsonData = undefined;
		}
	}
</script>

<PageLayout>
	<h1 class="text-4xl ml-6">Storage</h1>
	<div class="w-full px-4 md:p-0 flex flex-col justify-center items-center mt-24">
		<div class="mb-6 flex gap-2">
			<Button
				text="Download Data"
				colour="green"
				size="small"
				type="primary"
				click={() => {
					downloadAllData();
				}}
			/>
			<Button
				text="Upload Data"
				colour="green"
				size="small"
				type="primary"
				click={() => {
					showUploader = !showUploader;
				}}
			/>
		</div>
		{#if showUploader}
			<div class="flex gap-2 mb-4">
				<input
					type="file"
					name="file-upload"
					class="bg-white rounded-md"
					on:change={handleFileUpload}
				/>
				<Button
					text="Upload"
					colour="green"
					size="small"
					type="primary"
					disabled={!jsonData}
					click={() => {
						uploadData(jsonData);
					}}
				/>
			</div>
		{/if}
		<div class="bg-gray-500 p-4 rounded-md border-2">
			<span>Campaigns: {storageValues.campaigns} KB</span>
			<span>Characters: {storageValues.characters} KB</span>
			<span>NPCs: {storageValues.npcs} KB</span>
			<span>Quests: {storageValues.quests} KB</span>
			<span>Sessions: {storageValues.sessions} KB</span>
			<span>Places: {storageValues.settlements} KB</span>
			<div class="mt-4 tooltip text-white">
				Total: {storageValues.total} KB / {browserMaxLocalStorage} KB
				<span class="tooltiptext w-[20rem]"
					>This is a rough estimate. Storage varies from browser to browser. I recommend enabling
					unlimited localStorage for a better user experience</span
				>
				<div class="w-48 h-4 border bg-emerald-500 relative overflow-hidden">
					<div
						class="absolute top-0 left-0 h-4 bg-red-300 z-10"
						style={`width: ${(storageValues.total / browserMaxLocalStorage) * 100}%`}
					/>
				</div>
				<div class="w-48 flex justify-evenly">
					<div class="flex flex-col justify-center items-center mt-2">
						<div class="w-4 h-4 bg-red-300" />
						<p>Used</p>
					</div>
					<div class="flex flex-col justify-center items-center mt-2">
						<div class="w-4 h-4 bg-emerald-500" />
						<p>Available</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</PageLayout>

<style>
	span {
		display: block;
	}
</style>
