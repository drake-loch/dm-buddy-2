<script lang="ts">
	import { getCharacters, getNPCs } from '../../../../../utilities/helpers/dataManager';
	import { getPlaces } from '../../../../../utilities/helpers/placeHelper';
	import Input from '../formControl/Input.svelte';
	import Textarea from '../formControl/Textarea.svelte';

	export let editing = false;

	export let title = '';
	export let titleEditable = true;
	export let data = '';

	export let placeholder = 'Enter data here';

	export let save: () => void = () => {};
	export let deleteModule: () => void = () => {};

	// export let canEdit = false;

	$: localTitle = title;
	$: localData = data;

	let warningBanner = false;

	const saveModule = () => {
		title = localTitle;
		data = localData;
		save();
		editing = false;
	};

	const sanitizeInput = (input: string) => {
		if (!input) {
			return '';
		}
		const tempElement = document.createElement('div');
		tempElement.innerHTML = input;

		const allowedTags = ['B', 'BR', 'I', 'A', 'IMG'];
		const tags = tempElement.getElementsByTagName('*');

		for (let i = tags.length - 1; i >= 0; i--) {
			const tag = tags[i];
			if (!allowedTags.includes(tag.tagName.toUpperCase())) {
				tag.parentNode?.removeChild(tag);
			}
		}

		return tempElement.innerHTML.replaceAll('\n', '<br />');
	};

	let showAddLinkOptions = false;
	let showAddPictureOptions = false;

	let entityType: 'character' | 'npc' | 'place' | undefined = undefined;
	let selectedEntity: { label: string; value: string; link: string } | undefined = undefined;

	const imageData: { url: string; width: string; height: string } = {
		url: '',
		width: '500',
		height: '500'
	};

	const getEntities = (): { label: string; value: string }[] => {
		if (entityType === 'character') {
			return getCharacters().map((c) => {
				return {
					label: c.fullName,
					value: `${c.id}`,
					link: `/characters/${c.id}`
				};
			});
		} else if (entityType === 'npc') {
			return getNPCs().map((c) => {
				return {
					label: c.fullName,
					value: `${c.id}`,
					link: `/npcs/${c.id}`
				};
			});
		} else if (entityType === 'place') {
			return getPlaces().map((p) => {
				return {
					label: p.name,
					value: `${p.id}`,
					link: `/places/${p.id}`
				};
			});
		}
		return [];
	};

	$: entities = getEntities();
</script>

<div
	class="w-full px-2 py-4 md:px-6 md:pb-8 md:py-3 bg-gray-500 min-h-[5rem] rounded-md border border-gray-400"
>
	<span class="flex flex-wrap md:flex-nowrap gap-2 justify-between items-center mb-2 border-b pb-2">
		{#if editing}
			{#if titleEditable}
				<span class="w-full">
					<input
						type="text"
						name={`${title}-title`}
						bind:value={localTitle}
						{placeholder}
						class={`px-1 w-full text-2xl font-bold border rounded-sm`}
					/>
				</span>
			{:else}
				<h3 class="font-bold text-2xl">{title}</h3>
			{/if}
			<span class="flex gap-1">
				<button
					type="button"
					class="text-center bg-green-500 rounded-md p-0.5"
					aria-label="save module"
					on:click={() => {
						saveModule();
					}}>💾</button
				>

				<button
					type="button"
					class="text-center bg-red-500 rounded-md p-0.5"
					aria-label="delete module"
					on:click={() => {
						warningBanner = true;
					}}>🗑️</button
				>
				<button
					type="button"
					class="text-center bg-white rounded-md p-0.5"
					aria-label="cancel editing module"
					on:click={() => {
						localTitle = title;
						localData = data;
						editing = false;
					}}>🔙</button
				>
			</span>
		{:else}
			<h3 class="font-bold text-2xl">{title}</h3>
			<button
				type="button"
				class="text-center rounded-md p-0.5"
				aria-label="edit module"
				on:click={() => {
					editing = true;
				}}>✏️</button
			>
		{/if}
	</span>

	{#if warningBanner}
		<div class="bg-red-500 text-white rounded-md p-2 mb-2">
			<p class="text-sm mb-2">
				<span class="inline font-bold text-md"> Warning: </span>
				Are you sure you want to Delete?
			</p>
			<button
				type="button"
				aria-label="confirm delete module"
				class="px-2 py-0.5 bg-green-500 rounded-md border"
				on:click={() => {
					deleteModule();
					warningBanner = false;
				}}>Yes, I want to delete</button
			>
			<button
				type="button"
				aria-label="cancel delete module"
				class="px-2 py-0.5 bg-red-500 rounded-md border"
				on:click={() => {
					warningBanner = false;
				}}>Cancel</button
			>
		</div>
	{/if}

	<span class="flex gap-2 items-center mb-2">
		{#if editing}
			{#if !showAddLinkOptions && !showAddPictureOptions}
				<button
					type="button"
					class="text-center bg-green-500 rounded-md py-0.5 px-2"
					aria-label="save module"
					on:click={() => {
						showAddLinkOptions = true;
						showAddPictureOptions = false;
					}}>Add Link</button
				>
				<button
					type="button"
					class="text-center bg-green-500 rounded-md py-0.5 px-2"
					aria-label="save module"
					on:click={() => {
						showAddPictureOptions = true;
						showAddLinkOptions = false;
					}}>Add Picture</button
				>
			{/if}
			{#if showAddLinkOptions}
				<div class="flex flex-wrap md:flex-nowrap gap-2 items-center">
					<select
						name={`${title}-link-type`}
						class="border rounded-md bg-gray-600 px-2"
						bind:value={entityType}
						on:change={(e) => {
							selectedEntity = undefined;
							entities = getEntities();
						}}
					>
						<option value={undefined} disabled>Select Type</option>
						<option value="character">Character</option>
						<option value="npc">NPC</option>
						<option value="place">Place</option>
					</select>

					{#if entityType !== undefined}
						<select
							name={`${title}-link-entity`}
							class="border rounded-md bg-gray-600 px-2"
							bind:value={selectedEntity}
						>
							<option value={undefined} disabled>Select Entity</option>
							{#each entities as entity}
								<option value={entity}>{entity.label}</option>
							{/each}
						</select>
					{/if}
					{#if selectedEntity !== undefined}
						<button
							type="button"
							class="text-center bg-green-500 rounded-md py-0.5 px-2"
							aria-label="save module"
							on:click={() => {
								const link = `<a class="link" href="${selectedEntity?.link}">${selectedEntity?.label}</a>`;
								localData = localData + link;
								selectedEntity = undefined;
								entityType = undefined;
								showAddLinkOptions = false;
							}}>Add</button
						>
					{/if}
					<button
						type="button"
						class="text-center bg-red-500 rounded-md py-0.5 px-2"
						aria-label="save module"
						on:click={() => {
							selectedEntity = undefined;
							entityType = undefined;
							showAddLinkOptions = false;
						}}>Cancel</button
					>
				</div>
			{/if}

			{#if showAddPictureOptions}
				<div class="flex gap-2 items-center">
					<span class="w-1/2">
						<label for={`${title}-picture`}>URL:</label>
						<Input
							name={`${title}-picture`}
							placeholder="Picture URL"
							inputClass="border w-full rounded-sm"
							bind:value={imageData.url}
						/>
					</span>
					<span class="w-1/4">
						<label for={`${title}-picture-width`}>Width:</label>
						<Input
							name={`${title}-picture-width`}
							placeholder="Width"
							inputClass="border w-full rounded-sm"
							bind:value={imageData.width}
						/>
					</span>
					<span class="w-1/4">
						<label for={`${title}-picture-height`}>Height:</label>
						<Input
							name={`${title}-picture-height`}
							placeholder="Height"
							inputClass="border w-full rounded-sm"
							bind:value={imageData.height}
						/>
					</span>

					{#if imageData.url !== undefined && imageData.url !== ''}
						<button
							type="button"
							class="text-center bg-green-500 rounded-md py-0.5 px-2"
							aria-label="save module"
							on:click={() => {
								const image = `<img src="${imageData.url}" width='${imageData.width}' height='${imageData.height}' />`;
								localData = localData + image;
								imageData.url = '';
								imageData.width = '500';
								imageData.height = '500';
								showAddPictureOptions = false;
							}}>Add</button
						>
					{/if}
					<button
						type="button"
						class="text-center bg-red-500 rounded-md py-0.5 px-2"
						aria-label="save module"
						on:click={() => {
							imageData.url = '';
							imageData.width = '500';
							imageData.height = '500';
							showAddPictureOptions = false;
						}}>Cancel</button
					>
				</div>
			{/if}
		{/if}
	</span>

	{#if editing}
		<Textarea
			name={`${title}-textarea`}
			{placeholder}
			inputClass="border w-full rounded-sm"
			bind:value={localData}
			rows={5}
			textSize="text-md"
		/>
	{:else}
		<div class="output">
			{@html sanitizeInput(localData)}
		</div>
	{/if}
</div>

<style>
	div :global(.output) :global(a) {
		@apply text-blue-500 underline;
	}

	input,
	textarea {
		@apply text-black;
	}
</style>
