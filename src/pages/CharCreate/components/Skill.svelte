<script lang="ts">
	import { getBonus } from '../../../utilities/helpers/charHelper';

	export let checked = false;
	export let skill = 10;
	export let name = '';
	export let editMode = false;
</script>

<span class="flex items-center gap-2">
	<input disabled={!editMode} type="checkbox" name={`saving-${name}`} bind:checked />
	<label for={`saving-${name}`} class="">
		{getBonus(skill, checked)}
	</label>
	<p class="text-left w-full">{name}</p>
</span>
