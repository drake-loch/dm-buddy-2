<script lang="ts">
	import { getBonus, type Character, type Stat } from '../../../../../utilities/helpers/charHelper';

	export let skill: Stat;
	export let profBonus = 0;
	export let editing = false;

	$: bonus = getBonus(skill.value, skill.proficient, profBonus);

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

	let nameColour = '';
	$: {
		if (skill.proficient) {
			nameColour = 'text-green-500';
		} else {
			nameColour = 'text-black';
		}
	}

	function toggleProficiency() {
		skill.proficient = !skill.proficient;
		skill = skill;
	}
</script>

<div class="flex justify-center items-center w-1/2 gap-1 py-0.5">
	{#if editing}
		<input
			type="number"
			class="border text-black w-[1.5rem] text-center text-sm"
			bind:value={skill.value}
		/>
		<span class="flex w-full text-xs gap-0.5 justify-center items-center text-ellipsis">
			<button
				type="button"
				class={`font-semibold text-black text-xs ${nameColour}`}
				on:click={() => toggleProficiency()}>{skill.name}</button
			>
			<p class={`${textColour} text-xs`}>({bonus > 0 ? '+' : ''}{bonus})</p>
		</span>
	{:else}
		<p class="w-[1.5rem] text-sm font-bold text-center">{skill.value}</p>
		<p class={`${textColour} text-xs`}>({bonus > 0 ? '+' : ''}{bonus})</p>
		<span class="flex w-full text-xs gap-0.5 justify-center items-center text-ellipsis">
			<p class={`font-semibold text-black text-xs ${nameColour}`}>
				{skill.name}
			</p>
		</span>
	{/if}
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
