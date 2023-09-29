<script lang="ts">
	import type { Ability, Character } from '../../../../../utilities/helpers/charHelper';
	import Button from '../../../button/Button.svelte';
	import Input from '../formControl/Input.svelte';
	import Skill from './Skill.svelte';
	import Stat from './Stat.svelte';

	export let editing = false;
	export let abilities: Ability[] = [];
	export let profBonus = 0;

	let showSkills = false;
	function selectStat(stat: string) {
		return stat === selectedStat;
	}

	let selectedStat: string | undefined = undefined;

	function shortenName(name: string): string {
		return name.slice(0, 3);
	}
	$: skills = abilities.map((ability) => ability.skills).flat();

	function setSkillValuesFromAbility() {
		abilities.forEach((ability) => {
			ability.skills.forEach((skill) => {
				skill.value = ability.value;
			});
		});
		abilities = abilities;
		console.log(skills);
	}
</script>

<div class="flex justify-evenly text-sm mb-4">
	{#each abilities as ability}
		<Stat {editing} name={shortenName(ability.name)} bind:value={ability.value} {selectStat} />
	{/each}
</div>

<button type="button" class="w-full border" on:click={() => (showSkills = !showSkills)}
	>{showSkills ? 'Hide Skills' : 'Show Skills'}</button
>
{#if showSkills}
	<div class="w-full">
		<span class="flex w-full gap-2 py-2 items-center">
			<label for="proficiencyBonus" class={`text-sm w-fit`}>Proficiency Bonus:</label>
			<span class="w-[2rem]">
				{#if editing}
					<input
						type="number"
						class="border text-black w-[1.5rem] text-center text-sm"
						bind:value={profBonus}
					/>
				{:else}
					{profBonus
						? profBonus
						: abilities.find((ability) => ability.name === 'Proficiency Bonus')?.value ?? 0}
				{/if}
			</span>
		</span>
	</div>
	<div class="w-full flex flex-wrap justify-center items-center py-2 px-1 bg-gray-500">
		{#each skills as skill}
			<Skill {editing} bind:skill {profBonus} />
		{/each}
	</div>
	{#if editing}
		<div class="w-full flex justify-center items-center py-2 px-1 bg-gray-500">
			<Button text="Set Skills" size="small" click={setSkillValuesFromAbility} />
		</div>
	{/if}
{/if}

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
