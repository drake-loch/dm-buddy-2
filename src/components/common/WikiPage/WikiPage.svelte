<script lang="ts">
	import WikiEntry from './components/WikiEntry.svelte';

	export let additionalInfo: {
		title: string;
		data: string;
	}[] = [];
	export let title = '';
	export let type = '';
	export let typeOptions: string[] = [];
	export let editMode = false;
	export let hidePanel = false;
	export let hideAdditionalInfo = false;
	export let staticType = false;
	export let save: () => void = () => {};
</script>

<div class="w-3/4 box-border">
	<div class="flex gap-4">
		<!-- Details Panel -->
		{#if !hidePanel}
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
				<div class="mb-4 p-2 gap-2 flex flex-col items-center">
					{#if editMode}
						<input type="text" class="w-full px-2" bind:value={title} placeholder="Title/Name" />
					{:else}
						<span class="text-2xl font-bold">{title}</span>
					{/if}
					{#if editMode && !staticType}
						{#if typeOptions.length > 0}
							<select name="type" class="w-3/4 px-2" bind:value={type}>
								{#each typeOptions as typeOption}
									<option value={typeOption}>{typeOption}</option>
								{/each}
							</select>
						{:else}
							<input type="text" class="w-3/4 px-2" bind:value={type} placeholder="Type" />
						{/if}
					{:else}
						<p class="italic text-center">{type}</p>
					{/if}
				</div>
				<slot name="wikiPanel" />
			</div>
		{/if}
		<!-- additional detail - wiki  -->
		<div class="w-full h-[52rem] overflow-auto p-2 bg-gray-500 rounded-md">
			<div class=" mb-2 p-2">
				<h1 class="text-4xl">{title}</h1>
			</div>

			<slot name="wiki-top" />

			<div class=" mb-4">
				{#if editMode && !hideAdditionalInfo}
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
						{editMode}
						bind:title
						bind:data
						deleteModule={() => {
							additionalInfo = additionalInfo.filter((_, index) => index !== i);
						}}
						{save}
					/>
				</span>
			{/each}

			<slot name="wiki" />
		</div>
	</div>
</div>
