<script lang="ts">
	import type { Being } from '../../../../../utilities/helpers/orgHelper';
	import Input from '../formControl/Input.svelte';
	import Select from '../formControl/Select.svelte';

	export let being: Being;
	export let beings: Being[];

	export let controlName: string;
</script>

<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
	<Select
		name={`${controlName}-${being.type}-${being.id}`}
		bind:value={being.type}
		label="Title:"
		labelClass="text-sm font-semibold"
	>
		<option value="none">None</option>
		<option value="custom">Custom</option>
		<option value="npc">NPC</option>
		<option value="character">PC</option>
	</Select>
	{#if being.type === 'custom'}
		<Input
			name={`${controlName}-${being.type}-${being.id}`}
			bind:value={being.name}
			placeholder="e.g. 'King Arthur'"
			label="Name:"
			labelClass="text-sm font-semibold"
		/>
	{:else if being.type === 'npc' || being.type === 'character'}
		<Select
			name={`${controlName}-${being.type}-${being.id}`}
			bind:value={being.id}
			label="Title:"
			labelClass="text-sm font-semibold"
		>
			{#each beings.filter((b) => b.type === being.type) as b}
				<option value={b.id}>{b.name}</option>
			{/each}
		</Select>
	{/if}
</span>
