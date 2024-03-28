<script lang="ts">
	import { getCharacters, getNPCs } from '../../../../../utilities/helpers/dataManager';
	import {
		getItem,
		getItems,
		getPlaces,
		type Shop
	} from '../../../../../utilities/helpers/placeHelper';
	import Input from '../formControl/Input.svelte';
	import Textarea from '../formControl/Textarea.svelte';
	import ToggleSwitch from '../formControl/ToggleSwitch.svelte';

	export let editing = false;

	export let title = '';
	export let titleEditable = true;
	export let canDelete = true;
	export let data = '';

	export let placeholder = 'Enter data here';

	export let shop: Shop;

	export let save: () => void = () => {};
	export let deleteModule: () => void = () => {};

	let warningBanner = false;

	const saveModule = () => {
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

	const calculateRows = (str: string) => {
		const rows = str.split('\n').length;
		return rows > 5 ? rows : 5;
	};

	let showItemList = false;
	let existingItemId = 0;

	let showShopInventory = false;
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
						bind:value={title}
						{placeholder}
						class={`px-1 w-full text-2xl font-bold border rounded-sm bg-gray-300`}
					/>
				</span>
			{:else}
				<h3 class="font-bold text-2xl">{title}</h3>
			{/if}
			{#if canDelete}
				<span class="flex gap-1">
					<button
						type="button"
						class="text-center bg-red-500 rounded-md p-0.5"
						aria-label="delete module"
						on:click={() => {
							warningBanner = true;
						}}>🗑️</button
					>
				</span>
			{/if}
		{:else}
			<h3 class="font-bold text-2xl">{title}</h3>
		{/if}
	</span>

	{#if warningBanner && canDelete}
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
								data = data + link;
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
								data = data + image;
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
			bind:value={data}
			rows={calculateRows(data)}
			textSize="text-md"
		/>
		<span class="my-2">
			<ToggleSwitch
				name="hasInventoryToggle"
				label="Has Inventory"
				bind:checked={shop.hasInventory}
			/>
		</span>
		{#if shop.hasInventory}
			<h3 class="font-bold text-2xl mt-4">Inventory</h3>
			<div class="mb-4 mt-2">
				<button
					type="button"
					class="text-center bg-green-500 rounded-md py-0.5 px-2"
					aria-label="save module"
					on:click={() => {
						showItemList = !showItemList;
					}}
					>Add Existing Item
				</button>
				<button
					type="button"
					class="text-center bg-green-500 rounded-md py-0.5 px-2"
					aria-label="save module"
					on:click={() => {
						shop.inventory.push({
							name: '',
							description: '',
							quantity: 0,
							price: '',
							weight: '',
							id: -1,
							type: []
						});
						shop.inventory = [...shop.inventory];
					}}
					>Add Custom Item
				</button>
			</div>
			{#if showItemList}
				<div class="mb-4 mt-2">
					<select
						name={`${title}-shop-existing`}
						class="border rounded-md bg-gray-600 px-2"
						bind:value={existingItemId}
					>
						<option value={0} disabled>Select Item</option>
						{#each getItems() as item}
							<option value={item.id}>{item.name}</option>
						{/each}
					</select>
					<!-- add item -->
					<button
						type="button"
						disabled={existingItemId === 0}
						on:click={() => {
							const item = getItems().find((i) => i.id === existingItemId);
							if (item) {
								shop.inventory.push({
									name: '',
									description: '',
									quantity: 0,
									price: '0',
									weight: item.weight,
									id: item.id,
									type: item.type
								});
								shop.inventory = [...shop.inventory];
								showItemList = false;
							}
						}}
						class="text-center bg-green-500 rounded-md py-0.5 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Add Item
					</button>
				</div>
			{/if}

			<div class=" w-full">
				<table class="table-auto w-full">
					<thead>
						<tr>
							<th>Item Name</th>
							<th>Description</th>
							<th>Weight</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{#each shop.inventory as item, index}
							<tr class="text-center">
								<td>
									{#if item.id == -1}
										<Input
											name={`${title}-item-name-${index}`}
											placeholder="Item Name"
											inputClass="border w-full rounded-sm"
											bind:value={item.name}
										/>
									{:else}
										{@const existingItem = getItem(item.id)}
										{#if existingItem}
											<p>{existingItem.name}</p>
										{/if}
									{/if}
								</td>
								<td>
									{#if item.id == -1}
										<Textarea
											name={`${title}-item-description-${index}`}
											placeholder="Description"
											inputClass="border w-full rounded-sm"
											rows={1}
											bind:value={item.description}
										/>
									{:else}
										{@const existingItem = getItem(item.id)}
										{#if existingItem}
											<p class="">{existingItem.description}</p>
										{/if}
									{/if}
								</td>
								<td>
									{#if item.id == -1}
										<Input
											name={`${title}-item-weight-${index}`}
											placeholder="Weight"
											inputClass="border w-full rounded-sm"
											bind:value={item.weight}
										/>
									{:else}
										{@const existingItem = getItem(item.id)}
										{#if existingItem}
											<p>{existingItem.weight}</p>
										{/if}
									{/if}
								</td>
								<td>
									<span class="w-20">
										<Input
											name={`${title}-item-quantity-${index}`}
											placeholder="Quantity"
											inputClass="border w-full rounded-sm"
											bind:value={item.quantity}
										/>
									</span>
								</td>
								<td>
									<span class="w-20">
										<Input
											name={`${title}-item-price-${index}`}
											placeholder="Price"
											inputClass="border w-full rounded-sm"
											bind:value={item.price}
										/>
									</span>
								</td>
								<td>
									<button
										type="button"
										class="text-center bg-red-500 rounded-md py-0.5 px-2"
										aria-label="save module"
										on:click={() => {
											shop.inventory.splice(index, 1);
											shop.inventory = [...shop.inventory];
										}}
									>
										Remove
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	{:else}
		<div class="output">
			{@html sanitizeInput(data)}
		</div>
		{#if shop.hasInventory}
			<button
				type="button"
				class="font-bold text-2xl my-4 hover:text-blue-500"
				on:click={() => (showShopInventory = !showShopInventory)}
			>
				{`Inventory ${showShopInventory ? '▲' : '▼'}`}
			</button>
			{#if showShopInventory}
				<table class="table-auto w-full">
					<thead>
						<tr>
							<th>Item Name</th>
							<th>Description</th>
							<th>Weight</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{#each shop.inventory as item, index}
							{@const existingItem = getItem(item.id)}
							<tr class="text-center border-b">
								<td>
									{#if existingItem}
										<p>{existingItem.name}</p>
									{:else}
										<p>{item.name}</p>
									{/if}
								</td>
								<td>
									{#if existingItem}
										<p>{existingItem.description}</p>
									{:else}
										<p>{item.description}</p>
									{/if}
								</td>
								<td>
									{#if existingItem}
										<p>{existingItem.weight}</p>
									{:else}
										<p>{item.weight}</p>
									{/if}
								</td>
								<td>
									<span>{item.quantity}</span>
								</td>
								<td>
									<span>{item.price}</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		{/if}
	{/if}
</div>

<style>
	div :global(.output) :global(a) {
		@apply text-blue-500 underline;
	}

	input {
		@apply text-black;
	}
</style>
