<script lang="ts">
	import { getCampaigns, getQuests } from '../../../../utilities/helpers/campaignHelper';
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
	export let npc: NPC = newEmptyNPC();

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
		return npc.abilities.every((ability) => ability.value === 0);
	}
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if npc.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={npc.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={npc.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={npc.fullName}
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
								bind:value={npc.armorClass}
								placeholder="AC"
								inputClass="text-center"
							/>
						</span>
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="speed" class="text-sm font-semibold text-center">Speed</label>
							<Input
								name="speed"
								bind:value={npc.speed}
								placeholder="Speed"
								inputClass="text-center"
							/>
						</span>
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="hp" class="text-sm font-semibold text-center">HP</label>
							<Input
								name="hp"
								bind:value={npc.hitPoints}
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
								bind:value={npc.hitDice}
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
								bind:value={npc.initiative}
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
						bind:abilities={npc.abilities}
						bind:profBonus={npc.proficiencyBonus}
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Input
						name="age"
						bind:value={npc.age}
						placeholder="Age"
						label="Age:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="race"
						bind:value={npc.race}
						placeholder="Race"
						label="Race:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="gender"
						bind:value={npc.gender}
						placeholder="Gender"
						label="Gender:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="size"
						bind:value={npc.size}
						placeholder="Size"
						label="Size:"
						labelClass="text-sm font-semibold"
					/>
					<Select
						name="alignment"
						bind:value={npc.alignment}
						label="Alignment:"
						labelClass="text-sm font-semibold"
						selectClass="text-sm"
					>
						{#each ALIGNMENTS as alignment}
							<option value={alignment}>{alignment}</option>
						{/each}
					</Select>
					<Input
						name="occupation"
						bind:value={npc.occupation}
						placeholder="Occupation"
						label="Occupation:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Characteristics" />
					<Textarea
						name="personalityTraits"
						bind:value={npc.characteristics.personalityTraits}
						placeholder="Personality Traits"
						label="Personality Traits:"
						labelClass="text-sm font-semibold w-full"
						inputClass="w-full"
						className="flex flex-col w-full"
					/>
					<Textarea
						name="ideals"
						bind:value={npc.characteristics.ideals}
						placeholder="Ideals"
						label="Ideals:"
						labelClass="text-sm font-semibold w-full"
						inputClass="w-full"
						className="flex flex-col w-full"
					/>
					<Textarea
						name="bonds"
						bind:value={npc.characteristics.bonds}
						placeholder="Bonds"
						label="Bonds:"
						labelClass="text-sm font-semibold w-full"
						inputClass="w-full"
						className="flex flex-col w-full"
					/>
					<Textarea
						name="flaws"
						bind:value={npc.characteristics.flaws}
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
						bind:value={npc.description}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Features" />
					{#each npc.features as { title, desc, source }, i}
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
										npc.features = npc.features.filter((_, index) => index !== i);
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
								npc.features = [...npc.features, { title: '', desc: '', source: '' }];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Actions" />
					{#each npc.actions as action}
						<Input
							name="title"
							bind:value={action.title}
							placeholder="Title"
							label="Title:"
							labelClass="text-sm font-semibold"
						/>
						<Textarea
							name="desc"
							bind:value={action.desc}
							placeholder="Description"
							label="Description:"
							labelClass="text-sm font-semibold"
							inputClass="w-full"
						/>
						<span class="flex">
							<Input name="diceAmount" bind:value={action.dice.amount} placeholder="Dice Amount" />
							D
							<Input name="diceSides" bind:value={action.dice.sides} placeholder="6" />
						</span>
					{/each}
					<span class="pt-2 w-full">
						<button
							type="button"
							class="bg-green-500 rounded px-4"
							on:click={() => {
								npc.actions = [
									...npc.actions,
									{ title: '', desc: '', dice: { amount: 1, sides: 6 } }
								];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={npc.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<SectionWrapper border={false}>
					<span class="flex flex-col items-center">
						{#if npc.imageUrl}
							<Image bind:value={npc.imageUrl} />
						{/if}
						<p class="text-2xl font-semibold">{npc.fullName}</p>
						<p class="text-md italic">{`${npc.size} ${npc.race}, ${npc.alignment}`}</p>
					</span>
				</SectionWrapper>

				<SectionWrapper
					hidden={npc.armorClass === 0 &&
						npc.speed === 0 &&
						npc.hitPoints === 0 &&
						npc.hitDice === '' &&
						npc.initiative === 0}
				>
					<span class="flex justify-evenly items-center w-full">
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="ac" class="text-sm font-semibold text-center">AC</label>
							<Text text={npc.armorClass} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="speed" class="text-sm font-semibold text-center">Speed</label>
							<Text text={npc.speed} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="hp" class="text-sm font-semibold text-center">HP</label>
							<Text text={npc.hitPoints} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[3rem] gap-1">
							<label for="hitDice" class="text-sm font-semibold text-center whitespace-nowrap"
								>Hit Dice</label
							>
							<Text text={npc.hitDice} className="text-center" />
						</span>
						<span class="flex flex-col items-center w-[3rem] gap-1">
							<label for="initiative" class="text-sm font-semibold text-center">Initiative</label>
							<Text text={npc.initiative} className="text-center" />
						</span>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={checkIfAbilityScoresAreZero()}>
					<StatDisplay
						{editing}
						bind:abilities={npc.abilities}
						bind:profBonus={npc.proficiencyBonus}
					/>
				</SectionWrapper>

				<SectionWrapper>
					<LabelledText label="Age:" value={`${npc.age}`} />
					<LabelledText label="Race:" value={`${npc.race}`} />
					<LabelledText label="Gender:" value={`${npc.gender}`} />
					<LabelledText label="Occupation:" value={`${npc.occupation}`} />
					<LabelledText label="Alignment:" value={`${npc.alignment}`} />
					<LabelledText label="Size:" value={`${npc.size}`} />
				</SectionWrapper>

				<SectionWrapper hidden={npc.description === ''}>
					<Title text="Description" />
					<Text className="text-sm" text={npc.description ?? ''} />
				</SectionWrapper>

				{#if npc.characteristics.personalityTraits !== '' || npc.characteristics.ideals !== '' || npc.characteristics.bonds !== '' || npc.characteristics.flaws !== ''}
					<SectionWrapper>
						<span class="space-y-2 py-2 w-full">
							{#if npc.characteristics.personalityTraits !== ''}
								<LabelledText
									label="Personality Traits:"
									value={`${npc.characteristics.personalityTraits}`}
								/>
							{/if}
							{#if npc.characteristics.ideals !== ''}
								<hr />
								<LabelledText label="Ideals:" value={`${npc.characteristics.ideals}`} />
							{/if}
							{#if npc.characteristics.bonds !== ''}
								<hr />
								<LabelledText label="Bonds:" value={`${npc.characteristics.bonds}`} />
							{/if}
							{#if npc.characteristics.flaws !== ''}
								<hr />
								<LabelledText label="Flaws:" value={`${npc.characteristics.flaws}`} />
							{/if}
						</span>
					</SectionWrapper>
				{/if}

				<SectionWrapper>
					<Title text="Features" />

					{#each npc.features as { title, desc, source }, i}
						<span>
							<span class="flex items-center gap-2">
								<span class="text-black font-semibold text-left">{title}</span>
								<span class="italic text-sm">({source})</span>
							</span>
							<span class="italic text-sm">{desc}</span>
						</span>
						{#if i + 1 !== npc.features.length}
							<hr class="my-2" />
						{/if}
					{/each}
				</SectionWrapper>

				<SectionWrapper hidden={npc.actions.length === 0}>
					<Title text="Actions" />
					{#each npc.actions as action, index}
						<span class={`w-full py-1 ${index === 0 ? '' : 'border-t'}`}>
							<span class="flex items-center gap-2">
								<span class="text-black font-semibold text-left">{action.title}</span>
							</span>
							<span class="italic text-sm">{action.desc}</span>
						</span>
					{/each}
				</SectionWrapper>

				<SectionWrapper hidden={npc.notes === ''}>
					<Title text="Notes" />
					<Text className="text-sm" text={npc.notes} />
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2 px-2">{npc.fullName}</h1>

			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							npc.additionalInfo = [...npc.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#each npc.additionalInfo as { title, data }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data
							deleteModule={() => {
								npc.additionalInfo = npc.additionalInfo.filter((_, index) => index !== i);
							}}
							save={() => {
								npc.additionalInfo = [...npc.additionalInfo];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
