<script lang="ts">
	import Input from '../../../components/form/input/Input.svelte';
	import Textarea from '../../../components/form/textarea/Textarea.svelte';
	import type { Character } from '../../../utilities/helpers/charHelper';

	export let feature: Character['features'][number];
	export let editMode = false;
	export let i = 0;
</script>

<div class="flex flex-col gap-2 p-1 w-full">
	{#if editMode}
		<span class="w-full">
			<Input
				placeholder="title"
				name={`feature-${i}-title`}
				bind:value={feature.title}
				{editMode}
			/>
		</span>
		<span class="w-full">
			<Input
				placeholder="source"
				name={`feature-${i}-source`}
				bind:value={feature.source}
				{editMode}
			/>
		</span>
		<span class="w-full">
			<Textarea
				_class="w-full min-h-[10rem] rounded-md"
				placeholder="Description"
				name={`feature-${i}-description`}
				bind:value={feature.desc}
				{editMode}
			/>
		</span>
	{:else}
		<p class="font-bold">{feature.title}</p>
		<p class="text-sm italic">{feature.source}</p>
		<p class="">"{feature.desc}"</p>
	{/if}
</div>
