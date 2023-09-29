export type Stat = {
	name: string;
	value: number;
	bonus: number;
	proficient: boolean;
};
export type Ability = Stat & {
	skills: Stat[];
	savingThrow: boolean;
};
export type CharacterBase = {
	id: number;
	fullName: string;
	description: string;
	race: string;
	gender: string;
	age: number;
	alignment: string;
	proficiencyBonus: number;
	size: string;
	characteristics: {
		personalityTraits: string;
		ideals: string;
		bonds: string;
		flaws: string;
	};
	abilities: Ability[];
	passivePerception: number;
	otherProficiencies: { type: string; bonus: number }[];
	armorClass: number;
	initiative: number;
	speed: number;
	hitPoints: number;
	currentHitPoints: number;
	hitDice: string;
	equipment: { name: string; amount: number }[];
	features: { title: string; source: string; desc: string }[];
	notes: string;
	additionalInfo: { title: string; data: string }[];
	imageUrl: string;
};
export type Character = CharacterBase & {
	class: string;
	background: string;
	level: number;
	deathSaves: {
		successes: number;
		failures: number;
	};
	attacks: {
		name: string;
		bonus: number;
		damage: string;
		damageType: string;
	}[];
	spellcasting: {
		ability: string;
		saveDC: number;
		spellAttackBonus: number;
		spells: {
			name: string;
			level: number;
			school: string;
			castingTime: string;
			range: string;
			components: string;
			duration: string;
			description: string;
			damage: string;
			damageType: string;
		}[];
	};
};

export const newEmptyCharacter = (): Character => {
	return {
		id: 0,
		fullName: '',
		level: 0,
		description: '',
		race: '',
		gender: '',
		class: '',
		age: 0,
		size: '',
		alignment: '',
		background: '',
		characteristics: {
			personalityTraits: '',
			ideals: '',
			bonds: '',
			flaws: ''
		},
		abilities: newAbilities(),
		passivePerception: 0,
		proficiencyBonus: 0,
		otherProficiencies: [],
		armorClass: 0,
		initiative: 0,
		speed: 0,
		hitPoints: 0,
		currentHitPoints: 0,
		hitDice: '',
		deathSaves: {
			successes: 0,
			failures: 0
		},
		attacks: [],
		equipment: [],
		features: [],
		spellcasting: {
			ability: '',
			saveDC: 0,
			spellAttackBonus: 0,
			spells: []
		},
		notes: '',
		additionalInfo: [],
		imageUrl: ''
	};
};

export const handleCharacterPromptInput = (char: Character, promptInput: string): Character => {
	const parsed = JSON.parse(promptInput);
	char.fullName = parsed?.fullName ?? parsed?.name ?? char.fullName;
	char.class = parsed?.class ?? char.class;

	if (parsed?.level) {
		char.class = `${char.class} ${parsed.level}`;
	}

	char.background = parsed?.background ?? char.background;
	char.age = parsed?.age ?? char.age;
	char.alignment = parsed?.alignment ?? char.alignment;
	char.race = parsed?.race ?? char.race;
	char.gender = parsed?.gender ?? char.gender;

	char.characteristics.personalityTraits =
		parsed?.personalityTraits ??
		parsed?.characteristics.personalityTraits ??
		char.characteristics.personalityTraits;
	char.characteristics.ideals =
		parsed?.ideals ?? parsed?.characteristics.ideals ?? char.characteristics.ideals;
	char.characteristics.bonds =
		parsed?.bonds ?? parsed?.characteristics.bonds ?? char.characteristics.bonds;
	char.characteristics.flaws =
		parsed?.flaws ?? parsed?.characteristics.flaws ?? char.characteristics.flaws;

	// char.stats.str = parsed?.str ?? parsed?.strength ?? parsed?.stats.str ?? char.stats.str;
	// char.stats.dex = parsed?.dex ?? parsed?.dexterity ?? parsed?.stats.dex ?? char.stats.dex;
	// char.stats.con = parsed?.con ?? parsed?.constitution ?? parsed?.stats.con ?? char.stats.con;
	// char.stats.int = parsed?.int ?? parsed?.intelligence ?? parsed?.stats.int ?? char.stats.int;
	// char.stats.wis = parsed?.wis ?? parsed?.wisdom ?? parsed?.stats.wis ?? char.stats.wis;
	// char.stats.cha = parsed?.cha ?? parsed?.charisma ?? parsed?.stats.cha ?? char.stats.cha;
	// char.savingThrows = parsed?.savingThrows ?? char.savingThrows;
	// char.skills = parsed?.skills ?? char.skills;

	char.notes = parsed?.notes ?? char.notes;
	char.attacks = parsed?.attacks ?? char.attacks;
	char.features = parsed?.features ?? char.features;
	char.spellcasting = parsed?.spellcasting ?? char.spellcasting;
	char.additionalInfo = parsed?.additionalInfo ?? char.additionalInfo;

	if (parsed?.equipment) {
		char.equipment =
			parsed?.equipment.map((item: any) => {
				return {
					name: item.name ?? item,
					amount: item?.amount ?? 1
				};
			}) ?? char.equipment;
	}
	return char;
};

export const getBonus = (stat: number, proficient: boolean, bonus = 2): number => {
	return Math.floor((stat - 10) / 2) + (proficient ? bonus : 0);
};

export const newAbilities = (): Ability[] => {
	return [
		{
			name: 'Strength',
			value: 0,
			bonus: 0,
			savingThrow: false,
			proficient: false,
			skills: [
				{
					name: 'Athletics',
					value: 0,
					bonus: 0,
					proficient: false
				}
			]
		},
		{
			name: 'Dexterity',
			value: 0,
			bonus: 0,
			savingThrow: false,
			proficient: false,
			skills: [
				{
					name: 'Acrobatics',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Sleight of Hand',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Stealth',
					value: 0,
					bonus: 0,
					proficient: false
				}
			]
		},
		{
			name: 'Constitution',
			value: 0,
			bonus: 0,
			savingThrow: false,
			proficient: false,
			skills: []
		},
		{
			name: 'Intelligence',
			value: 0,
			bonus: 0,
			savingThrow: false,
			proficient: false,
			skills: [
				{
					name: 'Arcana',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'History',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Investigation',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Nature',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Religion',
					value: 0,
					bonus: 0,
					proficient: false
				}
			]
		},
		{
			name: 'Wisdom',
			value: 0,
			bonus: 0,
			savingThrow: false,
			proficient: false,
			skills: [
				{
					name: 'Animal Handling',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Insight',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Medicine',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Perception',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Survival',
					value: 0,
					bonus: 0,
					proficient: false
				}
			]
		},
		{
			name: 'Charisma',
			value: 0,
			bonus: 0,
			savingThrow: false,
			proficient: false,
			skills: [
				{
					name: 'Deception',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Intimidation',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Performance',
					value: 0,
					bonus: 0,
					proficient: false
				},
				{
					name: 'Persuasion',
					value: 0,
					bonus: 0,
					proficient: false
				}
			]
		}
	];
};

export const formatOldNPC = (npc: any): void => {
	//old npc needs it's stats updated to the new Character object type
	//description = ''
	//stats and skills are now abilities
	//savingThrows is now part of abilities
};
