<script lang="ts">
	import Input from '../../../form/input/Input.svelte';
	import Textarea from '../../../form/textarea/Textarea.svelte';

	export let editMode = false;

	export let title = '';
	export let titleEditable = true;
	export let data = '';

	export let placeholder = 'Enter data here';

	export let deleteModule: () => void;

	$: localTitle = title;
	$: localData = data;

	let warningBanner = false;

	const saveModule = () => {
		title = localTitle;
		data = localData;
		editMode = false;
	};

	const sanitizeInput = (input: string) => {
		if (!input) {
			return '';
		}
		const tempElement = document.createElement('div');
		tempElement.innerHTML = input;

		const allowedTags = ['B', 'BR', 'I'];
		const tags = tempElement.getElementsByTagName('*');

		for (let i = tags.length - 1; i >= 0; i--) {
			const tag = tags[i];
			if (!allowedTags.includes(tag.tagName.toUpperCase())) {
				tag.parentNode?.removeChild(tag);
			}
		}

		return tempElement.innerHTML.replaceAll('\n', '<br />');
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
			<button
				type="button"
				class="text-center rounded-md p-0.5"
				aria-label="edit module"
				on:click={() => {
					editMode = true;
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
	{#if editMode}
		<Textarea
			name={`${title}-textarea`}
			{placeholder}
			_class="border"
			editMode={true}
			bind:value={localData}
		/>
	{:else}
		{@html sanitizeInput(localData)}
	{/if}
</div>
