<script lang="ts">
	import { getCampaigns, getQuests } from '../../../../utilities/helpers/campaignHelper';
	import { newEmptyCharacter, type Character } from '../../../../utilities/helpers/charHelper';
	import { getAllBeings } from '../../../../utilities/helpers/dataManager';
	import { newEmptyNPC, type NPC } from '../../../../utilities/helpers/npcHelper/npcHelper';
	import { newOrg, type Org } from '../../../../utilities/helpers/orgHelper';
	import { getPlace, getPlaces } from '../../../../utilities/helpers/placeHelper';
	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import LabelledText from '../components/common/LabelledText.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Text from '../components/common/Text.svelte';
	import Title from '../components/common/Title.svelte';
	import TitledText from '../components/common/TitledText.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Multiselect from '../components/formControl/Multiselect.svelte';
	import Select from '../components/formControl/Select.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';
	import StatDisplay from '../components/stats/StatDisplay.svelte';

	export let editing = false;
	export let character: Character = newEmptyCharacter();

	export let submit: (form: any) => void;
	export let name: string = '';

	let showCombat = false;

	const ALIGNMENTS = [
		'Lawful Good',
		'Neutral Good',
		'Chaotic Good',
		'Lawful Neutral',
		'Neutral',
		'Chaotic Neutral',
		'Lawful Evil',
		'Neutral Evil',
		'Chaotic Evil'
	];

	function checkIfAbilityScoresAreZero() {
		return character.abilities.every((ability) => ability.value === 0);
	}
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if character.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={character.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={character.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={character.fullName}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper customSpacing>
					<!-- AC and Speed -->
					<span class="flex justify-evenly items-center w-full">
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="ac" class="text-sm font-semibold text-center">AC</label>
							<Input
								name="ac"
								bind:value={character.armorClass}
								placeholder="AC"
								inputClass="text-center"
							/>
						</span>
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="speed" class="text-sm font-semibold text-center">Speed</label>
							<Input
								name="speed"
								bind:value={character.speed}
								placeholder="Speed"
								inputClass="text-center"
							/>
						</span>
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="hp" class="text-sm font-semibold text-center">HP</label>
							<Input
								name="hp"
								bind:value={character.hitPoints}
								placeholder="HP"
								inputClass="text-center"
							/>
						</span>
						<span class="flex flex-col items-center w-[3rem] gap-1">
							<label for="hitDice" class="text-sm font-semibold text-center whitespace-nowrap"
								>Hit Dice</label
							>
							<Input
								name="hitDice"
								bind:value={character.hitDice}
								placeholder="Hit Dice"
								inputClass="text-center"
							/>
						</span>
					</span>
					<span class="flex justify-evenly items-center w-full mt-2">
						<span class="flex flex-col items-center w-[3rem] gap-1">
							<label for="initiative" class="text-sm font-semibold text-center">Initiative</label>
							<Input
								name="initiative"
								bind:value={character.initiative}
								placeholder="initiative"
								inputClass="text-center"
							/>
						</span>
					</span>
				</SectionWrapper>

				<SectionWrapper customSpacing>
					<Title text="Stats" />
					<StatDisplay
						{editing}
						bind:abilities={character.abilities}
						bind:profBonus={character.proficiencyBonus}
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Input
						name="age"
						bind:value={character.age}
						placeholder="Age"
						label="Age:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="race"
						bind:value={character.race}
						placeholder="Race"
						label="Race:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="gender"
						bind:value={character.gender}
						placeholder="Gender"
						label="Gender:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="size"
						bind:value={character.size}
						placeholder="Size"
						label="Size:"
						labelClass="text-sm font-semibold"
					/>
					<Select
						name="alignment"
						bind:value={character.alignment}
						label="Alignment:"
						labelClass="text-sm font-semibold"
						selectClass="text-sm"
					>
						{#each ALIGNMENTS as alignment}
							<option value={alignment}>{alignment}</option>
						{/each}
					</Select>
					<Input
						name="class"
						bind:value={character.class}
						placeholder="Class"
						label="Class:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Characteristics" />
					<Textarea
						name="personalityTraits"
						bind:value={character.characteristics.personalityTraits}
						placeholder="Personality Traits"
						label="Personality Traits:"
						labelClass="text-sm font-semibold w-full"
						inputClass="w-full"
						className="flex flex-col w-full"
					/>
					<Textarea
						name="ideals"
						bind:value={character.characteristics.ideals}
						placeholder="Ideals"
						label="Ideals:"
						labelClass="text-sm font-semibold w-full"
						inputClass="w-full"
						className="flex flex-col w-full"
					/>
					<Textarea
						name="bonds"
						bind:value={character.characteristics.bonds}
						placeholder="Bonds"
						label="Bonds:"
						labelClass="text-sm font-semibold w-full"
						inputClass="w-full"
						className="flex flex-col w-full"
					/>
					<Textarea
						name="flaws"
						bind:value={character.characteristics.flaws}
						placeholder="Flaws"
						label="Flaws:"
						labelClass="text-sm font-semibold w-full"
						inputClass="w-full"
						className="flex flex-col w-full"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Description" />
					<Textarea
						name="description"
						bind:value={character.description}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Features" />
					{#each character.features as { title, desc, source }, i}
						<div class="flex flex-col gap-2 pt-2">
							<Input
								name="title"
								bind:value={title}
								placeholder="Title"
								label="Title:"
								labelClass="text-sm font-semibold"
							/>
							<Input
								name="source"
								bind:value={source}
								placeholder="Source"
								label="Source:"
								labelClass="text-sm font-semibold"
							/>
							<Textarea
								name="desc"
								bind:value={desc}
								placeholder="Description"
								label="Description:"
								labelClass="text-sm font-semibold"
								inputClass="w-full"
							/>
							<span class="flex justify-end my-2">
								<button
									type="button"
									class="bg-red-500 rounded px-4"
									on:click={() => {
										character.features = character.features.filter((_, index) => index !== i);
									}}>Delete</button
								>
							</span>
						</div>
						<hr />
					{/each}

					<span class="pt-2 w-full">
						<button
							type="button"
							class="bg-green-500 rounded px-4"
							on:click={() => {
								character.features = [...character.features, { title: '', desc: '', source: '' }];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={character.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<SectionWrapper border={false}>
					<span class="flex flex-col items-center">
						{#if character.imageUrl}
							<Image bind:value={character.imageUrl} />
						{/if}
						<p class="text-2xl font-semibold">{character.fullName}</p>
						<p class="text-md italic">
							{`${character.size} ${character.race}, ${character.alignment}`}
						</p>
					</span>
				</SectionWrapper>

				<SectionWrapper
					hidden={character.armorClass === 0 &&
						character.speed === 0 &&
						character.hitPoints === 0 &&
						character.hitDice === '' &&
						character.initiative === 0}
				>
					<span class="flex justify-evenly items-center w-full">
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="ac" class="text-sm font-semibold text-center">AC</label>
							<Text text={character.armorClass} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="speed" class="text-sm font-semibold text-center">Speed</label>
							<Text text={character.speed} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="hp" class="text-sm font-semibold text-center">HP</label>
							<Text text={character.hitPoints} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[3rem] gap-1">
							<label for="hitDice" class="text-sm font-semibold text-center whitespace-nowrap"
								>Hit Dice</label
							>
							<Text text={character.hitDice} className="text-center" />
						</span>
						<span class="flex flex-col items-center w-[3rem] gap-1">
							<label for="initiative" class="text-sm font-semibold text-center">Initiative</label>
							<Text text={character.initiative} className="text-center" />
						</span>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={checkIfAbilityScoresAreZero()}>
					<StatDisplay
						{editing}
						bind:abilities={character.abilities}
						bind:profBonus={character.proficiencyBonus}
					/>
				</SectionWrapper>

				<SectionWrapper>
					<LabelledText label="Age:" value={`${character.age}`} />
					<LabelledText label="Race:" value={`${character.race}`} />
					<LabelledText label="Gender:" value={`${character.gender}`} />
					<LabelledText label="Class:" value={`${character.class}`} />
					<LabelledText label="Alignment:" value={`${character.alignment}`} />
					<LabelledText label="Size:" value={`${character.size}`} />
				</SectionWrapper>

				<SectionWrapper
					hidden={character.description === '' || character.description === undefined}
				>
					<Title text="Description" />
					<Text className="text-sm" text={character.description ?? ''} />
				</SectionWrapper>

				{#if character.characteristics.personalityTraits !== '' || character.characteristics.ideals !== '' || character.characteristics.bonds !== '' || character.characteristics.flaws !== ''}
					<SectionWrapper>
						<span class="space-y-2 py-2 w-full">
							{#if character.characteristics.personalityTraits !== ''}
								<LabelledText
									label="Personality Traits:"
									value={`${character.characteristics.personalityTraits}`}
								/>
							{/if}
							{#if character.characteristics.ideals !== ''}
								<hr />
								<LabelledText label="Ideals:" value={`${character.characteristics.ideals}`} />
							{/if}
							{#if character.characteristics.bonds !== ''}
								<hr />
								<LabelledText label="Bonds:" value={`${character.characteristics.bonds}`} />
							{/if}
							{#if character.characteristics.flaws !== ''}
								<hr />
								<LabelledText label="Flaws:" value={`${character.characteristics.flaws}`} />
							{/if}
						</span>
					</SectionWrapper>
				{/if}

				<SectionWrapper hidden={character.features.length === 0}>
					<Title text="Features" />

					{#each character.features as { title, desc, source }, i}
						<span>
							<span class="flex items-center gap-2">
								<span class="text-black font-semibold text-left">{title}</span>
								<span class="italic text-sm">({source})</span>
							</span>
							<span class="italic text-sm">{desc}</span>
						</span>
						{#if i + 1 !== character.features.length}
							<hr class="my-2" />
						{/if}
					{/each}
				</SectionWrapper>

				<SectionWrapper hidden={character.notes === ''}>
					<Title text="Notes" />
					<Text className="text-sm" text={character.notes} />
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2 px-2">{character.fullName}</h1>

			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							character.additionalInfo = [...character.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#each character.additionalInfo as { title, data }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data
							deleteModule={() => {
								character.additionalInfo = character.additionalInfo.filter(
									(_, index) => index !== i
								);
							}}
							save={() => {
								character.additionalInfo = [...character.additionalInfo];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
