<script lang="ts">
	import { onMount } from 'svelte';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import {
		downloadAllData,
		downloadData,
		uploadAllData
	} from '../../../utilities/helpers/dataManager';

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

			console.log(_x.substr(0, 50) + ' = ' + (_xLen / 1024).toFixed(2) + ' KB');
		}
		storageValues.total = +(_lsTotal / 1024).toFixed(2);
	};

	let browserMaxLocalStorage = 5000;
	onMount(() => {
		localStorageSpace();
	});

	let uploadedFile: File;
</script>

<PageLayout>
	<Toolbar viewNav={true} />
	<div class="w-full px-4 md:p-0 md:w-3/4">
		<h1 class="text-4xl mb-6">Storage</h1>
		<div class="mb-6 flex">
			<button
				type="button"
				class="bg-green-600 px-2 rounded-sm"
				on:click={() => {
					downloadAllData();
				}}>Download Data</button
			>
			<input
				type="file"
				name="file-upload"
				bind:value={uploadedFile}
				on:change={(e) => {
					//
				}}
				hidden
			/>
			<button
				type="button"
				hidden
				class="bg-blue-600 px-2 rounded-sm disabled:bg-blue-950"
				disabled={!uploadedFile}
				on:click={() => {
					// uploadAllData(uploadedFile);
				}}>Upload Data</button
			>
		</div>
		<div class="">
			<span>Campaigns: {storageValues.campaigns} KB</span>
			<span>Characters: {storageValues.characters} KB</span>
			<span>NPCs: {storageValues.npcs} KB</span>
			<span>Quests: {storageValues.quests} KB</span>
			<span>Sessions: {storageValues.sessions} KB</span>
			<span>Settlements: {storageValues.settlements} KB</span>
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
