<script lang="ts">
	import { newEmptyMonster } from '../../../../utilities/helpers/monsterHelper/monsterHelper';
	import Button from '../../button/Button.svelte';
	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import LabelledText from '../components/common/LabelledText.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Text from '../components/common/Text.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';
	import StatDisplay from '../components/stats/StatDisplay.svelte';

	export let editing = false;
	export let monster = newEmptyMonster();

	export let submit: (form: any) => void;
	export let name: string = '';

	function checkIfAbilityScoresAreZero() {
		return monster.abilities.every((ability) => ability.value === 0);
	}
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if monster.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={monster.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={monster.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={monster.name}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="type"
						bind:value={monster.type}
						placeholder="Type"
						label="Type:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="alignment"
						bind:value={monster.alignment}
						placeholder="LG/NG/CG"
						label="Alignment:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="size"
						bind:value={monster.size}
						placeholder="Medium"
						label="Size:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper customSpacing>
					<StatDisplay {editing} bind:abilities={monster.abilities} disableSkillsUI />
				</SectionWrapper>

				<SectionWrapper>
					<Input
						name="armourClass"
						bind:value={monster.armourClass.value}
						placeholder="0"
						label="Armour Class (AC):"
						labelClass="text-sm font-semibold whitespace-nowrap"
						inputClass="w-1/2"
					/>
					<Input
						name="armourClassSource"
						value={monster.armourClass.source}
						placeholder="natural armour"
						label="AC Source:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
						list="acSourceList"
					/>
					<datalist id="acSourceList">
						<option value="natural armour">natural armour</option>
						<option value="armour">armour</option>
						<option value="shield">shield</option>
						<option value="dexterity">dexterity</option>
						<option value="wisdom">wisdom</option>
						<option value="constitution">constitution</option>
						<option value="intelligence">intelligence</option>
						<option value="charisma">charisma</option>
						<option value="strength">strength</option>
					</datalist>
				</SectionWrapper>

				<SectionWrapper>
					<Input
						name="hitPoints"
						bind:value={monster.hitPoints.base}
						placeholder="0"
						label="Hit Points (HP):"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="hitPointsDice"
						bind:value={monster.hitPoints.dice}
						placeholder="1d6"
						label="HP Dice:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="hitPointsModifier"
						bind:value={monster.hitPoints.modifier}
						placeholder="+5"
						label="HP Modifier:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Input
						name="speed"
						bind:value={monster.speed}
						placeholder="30ft"
						label="Speed:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>

					<Input
						name="initiative"
						bind:value={monster.initiative}
						placeholder="+5"
						label="Initiative:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Input
						name="savingThrows"
						bind:value={monster.savingThrows}
						placeholder="Strength +5, Dexterity +3"
						label="Saving Throws:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="skills"
						bind:value={monster.skills}
						placeholder="Perception +5, Stealth +3"
						label="Skills:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="immunity"
						bind:value={monster.immunity}
						placeholder="poison"
						label="Immunity:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="resistances"
						bind:value={monster.resistances}
						placeholder="fire"
						label="Resistances:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="vulnerabilities"
						bind:value={monster.vulnerabilities}
						placeholder="cold"
						label="Vulnerabilities:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="passivePerception"
						bind:value={monster.passivePerception}
						placeholder="15"
						label="Passive Perception:"
						labelClass="text-sm font-semibold whitespace-nowrap"
						inputClass="w-1/2"
					/>
					<Input
						name="sight"
						bind:value={monster.sight}
						placeholder="darkvision 60ft"
						label="Sight:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="languages"
						bind:value={monster.languages}
						placeholder="Common, Elvish"
						label="Languages:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
					<Input
						name="difficulty"
						bind:value={monster.difficulty}
						placeholder="1"
						label="Difficulty:"
						labelClass="text-sm font-semibold"
						inputClass="w-1/2"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Actions" />
					{#each monster.actions as action}
						<div class="flex flex-col gap-2 pt-2 pb-2 border-b">
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
							<Button
								text="Delete"
								type="secondary"
								size="small"
								colour="red"
								click={() => {
									monster.actions = monster.actions.filter((a) => a !== action);
								}}
							/>
						</div>
					{/each}
					<span class="pt-2 w-full">
						<button
							type="button"
							class="bg-green-500 rounded px-4"
							on:click={() => {
								monster.actions = [
									...monster.actions,
									{ title: '', desc: '', dice: { amount: 1, sides: 6 } }
								];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={monster.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<SectionWrapper>
					<span class="flex flex-col items-center">
						{#if monster.imageUrl}
							<Image bind:value={monster.imageUrl} />
						{/if}
						<p class="text-2xl font-semibold">{monster.name}</p>
						<p class="text-md italic">
							{monster.size}
							{monster.type.toLowerCase()}, {monster.alignment}
						</p>
					</span>
				</SectionWrapper>

				<SectionWrapper
					hidden={monster.armourClass.value === 0 &&
						monster.speed === '' &&
						monster.hitPoints.base === 0 &&
						monster.hitDice === '' &&
						monster.initiative === 0}
				>
					<span class="flex justify-evenly items-center w-full">
						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="ac" class="text-sm font-semibold text-center">AC</label>
							<Text text={monster.armourClass.value} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="speed" class="text-sm font-semibold text-center">Speed</label>
							<Text text={monster.speed} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[2rem] gap-1">
							<label for="hp" class="text-sm font-semibold text-center">HP</label>
							<Text text={monster.hitPoints.base} className="text-center" />
						</span>

						<span class="flex flex-col items-center w-[3rem] gap-1">
							<label for="initiative" class="text-sm font-semibold text-center">Initiative</label>
							<Text text={monster.initiative} className="text-center" />
						</span>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={checkIfAbilityScoresAreZero()}>
					<StatDisplay {editing} bind:abilities={monster.abilities} disableSkillsUI />
				</SectionWrapper>

				<SectionWrapper>
					<LabelledText label="Saving Throws" value={monster.savingThrows} />
					<LabelledText label="Skills" value={monster.skills} />
					<LabelledText label="Immunities" value={monster.immunity} />
					<LabelledText label="Resistances" value={monster.resistances} />
					<LabelledText label="Vulnerabilities" value={monster.vulnerabilities} />
					<LabelledText label="Sight" value={monster.sight} />
					<LabelledText label="Passive Perception" value={monster.passivePerception} />
					<LabelledText label="Languages" value={monster.languages} />
					<LabelledText label="Difficulty" value={monster.difficulty} />
				</SectionWrapper>
				<SectionWrapper>
					<Title text="Actions" />
					{#each monster.actions as action}
						<LabelledText label={action.title} value={action.desc} />
					{/each}
				</SectionWrapper>

				<SectionWrapper hidden={monster.notes === ''}>
					<Title text="Notes" />
					<span class="font-semibold">
						{monster.notes}
					</span>
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							monster.additionalInfo = [...monster.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				<span class="mb-2 w-full">
					<Entry
						{editing}
						titleEditable={false}
						canDelete={false}
						title="Description"
						bind:data={monster.description}
					/>
				</span>
				{#each monster.additionalInfo as { title, data }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data
							deleteModule={() => {
								monster.additionalInfo = monster.additionalInfo.filter((_, index) => index !== i);
							}}
							save={() => {
								monster.additionalInfo = [...monster.additionalInfo];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
