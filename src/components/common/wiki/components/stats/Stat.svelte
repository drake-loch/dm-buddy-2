<script lang="ts">
	import { getBonus, type Character } from '../../../../../utilities/helpers/charHelper';

	export let name = '';
	export let value = 0;
	export let editing = false;
	export let selectStat: (stat: string) => void = () => {};

	$: bonus = getBonus(value, false);

	let textColour = '';
	$: {
		if (bonus > 0) {
			textColour = 'text-green-300';
		} else if (bonus < 0) {
			textColour = 'text-red-300';
		} else {
			textColour = 'text-white';
		}
	}
</script>

<div class="flex flex-col justify-center items-center">
	<p class="font-bold text-black">{name}</p>
	<span class="flex w-full text-xs gap-0.5 justify-center items-center">
		{#if editing}
			<input type="number" class="border px-1 text-black w-[1.5rem]" bind:value />
		{:else}
			<p>{value}</p>
		{/if}
		<p class={textColour}>({bonus > 0 ? '+' : ''}{bonus})</p>
	</span>
</div>

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
