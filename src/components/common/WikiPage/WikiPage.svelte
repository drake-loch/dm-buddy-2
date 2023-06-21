<script lang="ts">
	import WikiEntry from './components/WikiEntry.svelte';

	export let additionalInfo: {
		title: string;
		data: string;
	}[] = [];
	export let title = '';
	export let type = '';
	export let editMode = false;
</script>

<div class="w-3/4 box-border">
	<div class="flex gap-4">
		<!-- Details Panel -->
		<div
			class="border-b border-r-2 rounded-sm border-black w-1/3 h-[52rem] flex flex-col items-center p-2 bg-gray-500 overflow-auto"
		>
			<span class="">
				<img
					src="https://via.placeholder.com/150"
					alt="placeholder"
					class="w-full h-full object-cover"
				/>
			</span>
			<div class=" mb-4 p-2">
				<span class="text-2xl font-bold">{title}</span>
				<p class="italic text-center">{type}</p>
			</div>
			<slot name="wikiPanel" />
		</div>
		<!-- additional detail - wiki  -->
		<div class="w-full h-[52rem] overflow-auto p-2 bg-gray-500 rounded-md">
			<div class=" mb-2 p-2">
				<h1 class="text-4xl">{title}</h1>
			</div>
			<div class=" mb-4">
				{#if editMode}
					<button
						type="button"
						class="bg-blue-500 px-2 py-0.5 rounded-md border"
						on:click={() => {
							additionalInfo = [...additionalInfo, { title: '', data: '' }];
						}}>+ Add</button
					>
				{/if}
			</div>
			<!-- Module -->
			{#each additionalInfo as { title, data }, i}
				<span class="mb-2 w-full">
					<WikiEntry
						{title}
						{data}
						deleteModule={() => {
							additionalInfo = additionalInfo.filter((_, index) => index !== i);
						}}
					/>
				</span>
			{/each}
			<slot name="wiki" />
		</div>
	</div>
</div>
