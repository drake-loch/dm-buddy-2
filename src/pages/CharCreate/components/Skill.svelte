<script lang="ts">
	import { getBonus } from '../../../utilities/helpers/charHelper';

	export let checked = false;
	export let skill = 10;
	export let name = '';
	export let editMode = false;

	$: bonus = getBonus(skill, false);

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

<span class="flex items-center gap-2">
	<input disabled={!editMode} type="checkbox" name={`skill-check-${name}`} bind:checked />
	<p class="text-center w-6">
		{bonus > 0 ? '+' : ''}{bonus}
	</p>
	<label for={`skill-check-${name}`} class="text-left w-full">{name}</label>
</span>
