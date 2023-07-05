<script lang="ts">
	import { getCharacters, getNPCs } from '../../../../utilities/helpers/dataManager';
	import { getSettlements } from '../../../../utilities/helpers/settlementHelper';
	import Input from '../../../form/input/Input.svelte';
	import Textarea from '../../../form/textarea/Textarea.svelte';

	export let editMode = false;

	export let title = '';
	export let titleEditable = true;
	export let data = '';

	export let placeholder = 'Enter data here';

	export let save: () => void = () => {};
	export let deleteModule: () => void = () => {};

	export let canEdit = false;

	$: localTitle = title;
	$: localData = data;

	let warningBanner = false;

	const saveModule = () => {
		title = localTitle;
		data = localData;
		save();
		if (canEdit) {
			editMode = false;
		}
	};

	const sanitizeInput = (input: string) => {
		if (!input) {
			return '';
		}
		const tempElement = document.createElement('div');
		tempElement.innerHTML = input;

		const allowedTags = ['B', 'BR', 'I', 'A'];
		const tags = tempElement.getElementsByTagName('*');

		for (let i = tags.length - 1; i >= 0; i--) {
			const tag = tags[i];
			if (!allowedTags.includes(tag.tagName.toUpperCase())) {
				tag.parentNode?.removeChild(tag);
			}
		}

		return tempElement.innerHTML.replaceAll('\n', '<br />');
	};

	let showAddOptions = false;

	let entityType: 'character' | 'npc' | 'settlement' | undefined = undefined;
	let selectedEntity: { label: string; value: string; link: string } | undefined = undefined;

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
		} else if (entityType === 'settlement') {
			return getSettlements().map((c) => {
				return {
					label: c.name,
					value: `${c.id}`,
					link: `/settlements/${c.id}`
				};
			});
		}
		return [];
	};
</script>

<div class="w-full p-4 bg-gray-600 min-h-[5rem] rounded-sm">
	<span class="flex gap-2 items-center mb-2">
		{#if editMode}
			{#if titleEditable}
				<span class="w-full">
					<Input
						name={`${title}-title`}
						type="text"
						{placeholder}
						_class="text-2xl font-bold border"
						editMode={true}
						bind:value={localTitle}
					/>
				</span>
			{:else}
				<h3 class="font-bold text-2xl">{title}</h3>
			{/if}
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
					editMode = false;
				}}>🔙</button
			>
		{:else}
			<h3 class="font-bold text-2xl">{title}</h3>
			{#if canEdit}
				<button
					type="button"
					class="text-center rounded-md p-0.5"
					aria-label="edit module"
					on:click={() => {
						editMode = true;
					}}>✏️</button
				>
			{/if}
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
		{#if editMode}
			<button
				type="button"
				class="text-center bg-green-500 rounded-md py-0.5 px-2"
				aria-label="save module"
				on:click={() => {
					showAddOptions = true;
				}}>Add Link</button
			>
			{#if showAddOptions}
				<div class="flex gap-2 items-center">
					<select
						name={`${title}-link-type`}
						class="border rounded-md bg-gray-600 px-2"
						on:change={(e) => {
							//
						}}
						bind:value={entityType}
					>
						<option value={undefined} disabled>Select Type</option>
						<option value="character">Character</option>
						<option value="npc">NPC</option>
						<option value="settlement">Settlement</option>
					</select>

					{#if entityType !== undefined}
						<select
							name={`${title}-link-entity`}
							class="border rounded-md bg-gray-600 px-2"
							bind:value={selectedEntity}
						>
							<option value={undefined} disabled>Select Entity</option>
							{#each getEntities() as entity}
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
								showAddOptions = false;
							}}>Add</button
						>
					{/if}
					<button
						type="button"
						class="text-center bg-red-500 rounded-md py-0.5 px-2"
						aria-label="save module"
						on:click={() => {
							showAddOptions = false;
						}}>Cancel</button
					>
				</div>
			{/if}
		{/if}
	</span>

	{#if editMode}
		<Textarea
			name={`${title}-textarea`}
			{placeholder}
			_class="border h"
			editMode={true}
			bind:value={localData}
			rows={5}
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
</style>
