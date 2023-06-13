<script lang="ts">
	import { getBonus, type Character } from '../../../utilities/helpers/charHelper';
	import Input from '../../../components/form/input/Input.svelte';

	export let value = 0;
	export let name = '';
	export let editMode = false;
</script>

<span class="w-[8rem] border border-gray-800 p-2 flex flex-col items-center">
	<label for={name} class="mx-auto">{name}</label>
	<p class="text-center">{getBonus(value, false)}</p>
	<Input {editMode} name="strength" bind:value _class="text-center" />
</span>
