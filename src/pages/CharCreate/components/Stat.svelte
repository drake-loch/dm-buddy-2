<script lang="ts">
	import { getBonus, type Character } from '../../../utilities/helpers/charHelper';
	import Input from '../../../components/form/input/Input.svelte';

	export let value = 0;
	export let name = '';
	export let editMode = false;
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

<span class="w-[8rem] border border-gray-800 p-2 flex flex-col items-center">
	<label for={name} class="mx-auto">{name}</label>
	<p class={`text-center text-lg py-1 ${textColour}`}>{bonus > 0 ? '+' : ''}{bonus}</p>
	<Input
		{editMode}
		name="strength"
		bind:value
		_class="text-center"
		viewClass="border border-black py-1 px-2 rounded-md  text-xs"
	/>
</span>
