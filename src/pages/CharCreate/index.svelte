<script lang="ts">
	import PromptTool from '../../components/common/PromptTool/PromptTool.svelte';
	import Input from '../../components/form/input/Input.svelte';
	import Textarea from '../../components/form/textarea/Textarea.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
	import {
		newEmptyCharacter,
		handleCharacterPromptInput,
		getBonus
	} from '../../utilities/helpers/charHelper';
	import { generateRandomCharPrompt } from '../../utilities/helpers/promptHelper';
	import Feature from './components/Feature.svelte';
	import Skill from './components/Skill.svelte';
	import Stat from './components/Stat.svelte';

	let char = newEmptyCharacter();

	let editMode = true;

	$: getAttacksAndSpellsFormatted = (): { name: string; bonus: number; damage: string }[] => {
		let attacksAndSpells: { name: string; bonus: number; damage: string }[] = [];
		char.attacks.forEach((attack) => {
			attacksAndSpells.push({
				name: attack.name,
				bonus: getBonus(attack.bonus, false),
				damage: `${attack.damage} ${attack.damageType}`
			});
		});
		char.spellcasting.spells.forEach((spell) => {
			attacksAndSpells.push({
				name: spell.name,
				bonus: char.spellcasting.spellAttackBonus,
				damage: spell.damage
			});
		});
		return attacksAndSpells;
	};

	let promptInput = '';
</script>

<div class="flex justify-center w-full h-full gap-6">
	<!-- toolbar -->
	<Toolbar>
		<div class="mb-4 w-full flex justify-center flex-wrap gap-1">
			<button
				type="button"
				class="border border-green-500 py-2 px-4"
				on:click={() => (char = newEmptyCharacter())}>New Character</button
			>
			<button type="button" class="border border-green-500 py-2 px-4">Save Character</button>
			<button
				type="button"
				class="border border-blue-500 py-2 px-4"
				on:click={() => {
					editMode = !editMode;
				}}>Toggle View ({editMode ? 'Editing' : 'View'})</button
			>
		</div>

		<PromptTool
			bind:editMode
			bind:promptInput
			handleApply={() => {
				char = handleCharacterPromptInput(char, promptInput);
			}}
			handleGenerate={() => {
				promptInput = generateRandomCharPrompt(char);
			}}
		/>
	</Toolbar>

	<!-- sheet -->
	<div class="w-full h-[55rem] box-border">
		<!-- name, race, background, etc.. -->
		<div class="border-2 border-black p-2 box-border w-full flex gap-2 mb-2">
			<span class="w-[20rem]">
				<Input
					{editMode}
					label="Name"
					name="characterName"
					bind:value={char.fullName}
					labelPosition="bottom"
					_class="text-center"
					viewClass="border-b border-black pb-2 rounded-md text-center"
				/>
			</span>
			<div class="flex flex-col gap-2 border-l border-gray-900 pl-6">
				<span class="w-[5rem]">
					<Input
						{editMode}
						label="AC"
						name="armorClass"
						bind:value={char.armorClass}
						_class="text-center"
						viewClass="border-b border-black pb-2 rounded-md text-center"
					/>
				</span>
				<span class="w-[5rem]">
					<Input
						{editMode}
						label="Initiative"
						name="initiative"
						bind:value={char.initiative}
						_class="text-center"
						viewClass="border-b border-black pb-2 rounded-md text-center"
					/>
				</span>
				<span class="w-[5rem]">
					<Input
						{editMode}
						label="Speed"
						name="speed"
						bind:value={char.speed}
						_class="text-center"
						viewClass="border-b border-black pb-2 rounded-md text-center"
					/>
				</span>
			</div>
			<div class="flex flex-col gap-2 ml-10">
				<span class="w-[5rem] flex gap-1 items-center">
					<Input
						editMode={true}
						label="HP"
						name="HP"
						bind:value={char.currentHitPoints}
						_class="text-center"
						viewClass="border-b border-black pb-2 rounded-md text-center"
					/>
					<p class="whitespace-nowrap">/ {char.hitPoints}</p>
				</span>
				<span class="w-[5rem]">
					<Input
						{editMode}
						label="Hit Dice"
						name="hitDice"
						bind:value={char.hitDice}
						_class="text-center"
						viewClass="border-b border-black pb-2 rounded-md text-center"
					/>
				</span>
			</div>
			<div class="w-full px-4 flex flex-col items-end gap-4">
				<div class="flex gap-2">
					<span class="w-[15rem]">
						<Input
							{editMode}
							label="Class"
							name="class"
							bind:value={char.class}
							labelPosition="bottom"
							_class="text-center"
							viewClass="border-b border-black pb-2 rounded-md text-center"
							options={[
								'Barbarian',
								'Bard',
								'Cleric',
								'Druid',
								'Fighter',
								'Monk',
								'Paladin',
								'Ranger',
								'Rogue',
								'Sorcerer',
								'Warlock',
								'Wizard'
							]}
						/>
					</span>
					<span class="w-[20rem]">
						<Input
							{editMode}
							label="Background"
							name="background"
							bind:value={char.background}
							labelPosition="bottom"
							_class="text-center"
							viewClass="border-b border-black pb-2 rounded-md text-center"
							options={[
								'Acolyte',
								'Charlatan',
								'Criminal',
								'Entertainer',
								'Folk Hero',
								'Guild Artisan',
								'Hermit',
								'Noble',
								'Outlander',
								'Sage',
								'Sailor',
								'Soldier',
								'Urchin'
							]}
						/>
					</span>
				</div>
				<div class="flex gap-2">
					<span class="w-[15rem]">
						<Input
							{editMode}
							label="Race"
							name="race"
							bind:value={char.race}
							labelPosition="bottom"
							_class="text-center"
							viewClass="border-b border-black pb-2 rounded-md text-center"
							options={[
								'Dragonborn',
								'Dwarf',
								'Elf',
								'Gnome',
								'Half-Elf',
								'Halfling',
								'Half-Orc',
								'Human',
								'Tiefling'
							]}
						/>
					</span>
					<span class="w-[8rem]">
						<Input
							{editMode}
							label="Gender"
							name="gender"
							bind:value={char.gender}
							labelPosition="bottom"
							viewClass="border-b border-black pb-2 rounded-md text-center"
							_class="text-center"
							options={['Male', 'Female']}
						/>
					</span>
					<span class="w-[10rem]">
						<Input
							{editMode}
							label="Alignment"
							name="alignment"
							bind:value={char.alignment}
							labelPosition="bottom"
							_class="text-center"
							viewClass="border-b border-black pb-2 rounded-md text-center"
							options={[
								'Lawful Good',
								'Neutral Good',
								'Chaotic Good',
								'Lawful Neutral',
								'True Neutral',
								'Chaotic Neutral',
								'Lawful Evil',
								'Neutral Evil',
								'Chaotic Evil'
							]}
						/>
					</span>
				</div>
			</div>
		</div>
		<!-- core details -->
		<div class="w-full flex gap-2 justify-evenly mb-6">
			<!-- Stats -->
			<div class="flex flex-col gap-2 p-2 box-border border-2 border-black">
				<Stat {editMode} name="Strength" bind:value={char.stats.str} />
				<Stat {editMode} name="Dexterity" bind:value={char.stats.dex} />
				<Stat {editMode} name="Constitution" bind:value={char.stats.con} />
				<Stat {editMode} name="Intelligence" bind:value={char.stats.int} />
				<Stat {editMode} name="Wisdom" bind:value={char.stats.wis} />
				<Stat {editMode} name="Charisma" bind:value={char.stats.cha} />
			</div>
			<!-- saving throws & skills -->
			<div class="border-2 border-black p-2 w-[16rem]">
				<!-- saving throws -->
				<div class="px-2 py-1 flex flex-col gap-0.5 border border-black mb-2">
					<Skill
						bind:checked={char.savingThrows.str}
						name="Strength"
						bind:skill={char.stats.str}
						{editMode}
					/>
					<Skill
						bind:checked={char.savingThrows.dex}
						name="Dexterity"
						bind:skill={char.stats.dex}
						{editMode}
					/>
					<Skill
						bind:checked={char.savingThrows.con}
						name="Constitution"
						bind:skill={char.stats.con}
						{editMode}
					/>
					<Skill
						bind:checked={char.savingThrows.int}
						name="Intelligence"
						bind:skill={char.stats.int}
						{editMode}
					/>
					<Skill
						bind:checked={char.savingThrows.wis}
						name="Wisdom"
						bind:skill={char.stats.wis}
						{editMode}
					/>
					<Skill
						bind:checked={char.savingThrows.cha}
						name="Charisma"
						bind:skill={char.stats.cha}
						{editMode}
					/>
					<h3 class="font-bold text-center text-sm mt-1">Saving Throws</h3>
				</div>
				<!-- Skills -->
				<div class="px-2 py-1 flex flex-col gap-0.5 border border-black">
					<Skill
						{editMode}
						bind:checked={char.skills.acrobatics.proficient}
						name="Acrobatics (dex)"
						bind:skill={char.stats.dex}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.animalHandling.proficient}
						name="Animal Handling (wis)"
						bind:skill={char.stats.wis}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.arcana.proficient}
						name="Arcana (int)"
						bind:skill={char.stats.int}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.athletics.proficient}
						name="Athletics (str)"
						bind:skill={char.stats.str}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.deception.proficient}
						name="Deception (cha)"
						bind:skill={char.stats.cha}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.history.proficient}
						name="History (int)"
						bind:skill={char.stats.int}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.insight.proficient}
						name="Insight (wis)"
						bind:skill={char.stats.wis}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.intimidation.proficient}
						name="Intimidation (cha)"
						bind:skill={char.stats.cha}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.investigation.proficient}
						name="Investigation (int)"
						bind:skill={char.stats.int}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.medicine.proficient}
						name="Medicine (wis)"
						bind:skill={char.stats.wis}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.nature.proficient}
						name="Nature (int)"
						bind:skill={char.stats.int}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.perception.proficient}
						name="Perception (wis)"
						bind:skill={char.stats.wis}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.performance.proficient}
						name="Performance (cha)"
						bind:skill={char.stats.cha}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.persuasion.proficient}
						name="Persuasion (cha)"
						bind:skill={char.stats.cha}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.religion.proficient}
						name="Religion (int)"
						bind:skill={char.stats.int}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.sleightOfHand.proficient}
						name="Sleight of Hand (dex)"
						bind:skill={char.stats.dex}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.stealth.proficient}
						name="Stealth (dex)"
						bind:skill={char.stats.dex}
					/>
					<Skill
						{editMode}
						bind:checked={char.skills.survival.proficient}
						name="Survival (wis)"
						bind:skill={char.stats.wis}
					/>
					<h3 class="font-bold text-center text-sm mt-1">Skills</h3>
				</div>
			</div>
			<!-- Attacks & Equipment -->
			<div class="border-2 border-black w-[22rem] p-2">
				<!-- Attacks -->
				<div class="flex flex-col">
					<div class="flex flex-row gap-1 border border-black px-1 font-bold text-center">
						<span class="w-full"> Name </span>
						<span class="w-1/4 border-x px-2 border-black"> Bonus </span>
						<span class="w-full"> Damage/Type </span>
					</div>
					{#each getAttacksAndSpellsFormatted() as attack}
						<div
							class={`flex flex-row items-center gap-1 p-1 w-full ${
								editMode ? '' : 'border-b border-x border-black pb-2 px-2'
							}`}
						>
							<span class="w-full">
								<Input {editMode} name="attackName" bind:value={attack.name} _class="px-1" />
							</span>
							<span class="w-1/4">
								<Input
									{editMode}
									name="attackBonus"
									bind:value={attack.bonus}
									_class="text-center"
									viewClass="text-center"
								/>
							</span>
							<span class="w-full">
								<Input
									{editMode}
									name="attackDamage"
									bind:value={attack.damage}
									_class="px-1 text-right"
									viewClass="text-right"
								/>
							</span>
						</div>
					{/each}
					<button
						type="button"
						class={`border border-white text-center px-1 mt-2 ${editMode ? '' : 'hidden'}`}
						on:click={() => {
							char.attacks = [...char.attacks, { name: '', bonus: 0, damage: '', damageType: '' }];
						}}>+</button
					>
					<h3 class="font-bold text-center text-sm">Weapons & Spells</h3>
				</div>
				<!-- Equipment -->
				<div class="flex flex-col">
					<div class="flex flex-row gap-2 border border-black px-1 font-bold text-center">
						<span class="w-1/4 border-r border-black"> # </span>
						<span class="w-3/4"> Name </span>
					</div>
					{#each char.equipment as item}
						<div
							class={`flex flex-row gap-1 p-1 w-full ${
								editMode ? '' : 'border-x border-b border-black pb-2'
							}`}
						>
							<span class="w-1/4 px-2">
								<Input editMode name="item" bind:value={item.amount} _class="text-center" />
							</span>
							<span class="w-3/4">
								<Input {editMode} name="item" bind:value={item.name} viewClass="text-left" />
							</span>
						</div>
					{/each}
					<button
						type="button"
						class={`border border-white text-center px-1 mt-2 ${editMode ? '' : 'hidden'}`}
						on:click={() => {
							char.equipment = [...char.equipment, { name: '', amount: 0 }];
						}}>+</button
					>
					<h3 class="font-bold text-center text-sm">Equipment</h3>
				</div>
			</div>
			<!-- Features and Traits -->
			<div class="flex flex-col gap-2 border-2 border-black p-2 w-[18rem]">
				{#each char.features as feature, i}
					<Feature {editMode} bind:feature {i} />
				{/each}
				<button
					type="button"
					class={`border border-white text-center px-1 mt-2 ${editMode ? '' : 'hidden'}`}
					on:click={() => {
						char.features = [...char.features, { title: '', source: '', desc: '' }];
					}}>+</button
				>
				<h3 class="font-bold text-center text-sm">Features & Traits</h3>
			</div>
			<!-- personality & notes -->
			<div class="border-2 border-black w-[26rem]">
				<div class="flex flex-col gap-2 p-2 text-center">
					<div class="flex flex-col gap-2 p-1 w-full">
						<span class="w-full">
							<Textarea
								{editMode}
								_class="w-full min-h-[4rem] rounded-md"
								name="personality"
								bind:value={char.characteristics.personalityTraits}
							/>
							<p class="font-bold">Personality Traits</p>
						</span>
						<span class="w-full">
							<Textarea
								{editMode}
								_class="w-full min-h-[4rem] rounded-md"
								name="personality"
								bind:value={char.characteristics.ideals}
							/>
							<p class="font-bold">Ideals</p>
						</span>
						<span class="w-full">
							<Textarea
								{editMode}
								_class="w-full min-h-[4rem] rounded-md"
								name="personality"
								bind:value={char.characteristics.bonds}
							/>
							<p class="font-bold">Bonds</p>
						</span>
						<span class="w-full">
							<Textarea
								{editMode}
								_class="w-full min-h-[4rem] rounded-md"
								name="personality"
								bind:value={char.characteristics.flaws}
							/>
							<p class="font-bold">Flaws</p>
						</span>
						<span class="w-full mt-4">
							<Textarea
								{editMode}
								_class="w-full min-h-[15rem] rounded-md"
								name="personality"
								bind:value={char.notes}
							/>
							<p class="font-bold">Notes</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
