<script lang="ts">
	export let editMode = false;
	export let label = '';
	export let value: string | number = '';
	export let textarea = false;
	export let showIfEmpty = false;
	export let valueClass = '';
	export let name = '';
</script>

{#if value !== '' || editMode || showIfEmpty}
	<span class="flex gap-2 text-sm">
		{#if editMode}
			<span class="flex flex-col w-full">
				<span class="font-semibold text-black">{label} </span>
				{#if !textarea}
					<input {name} type="text" class="border px-1 text-black" bind:value />
				{:else}
					<textarea {name} class="border px-1 text-black w-full" rows="4" bind:value />
				{/if}
			</span>
		{:else}
			<span>
				{#if label !== ''}
					<label for={name} class="font-semibold text-black">{label}</label>
				{/if}
				<span class={valueClass}>
					{value}
				</span>
			</span>
		{/if}
	</span>
{/if}
